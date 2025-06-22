
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateuser = require("../utils");
const Note = require("../Models/Note");


const signup = async (req, res) => {

  try {

    try {
     validateuser(req.body);
    } catch (err) {
      return res.status(400).send("Validation failed: " + err.message);
    }

    const {name, email,password} = req.body;

    const existingUser = await User.findOne({email});

    if(existingUser)
        return res.status(400).send("user already exist");

    const hashedPassword = await bcrypt.hash(password,10);


    await User.create({name: name ,email: email,password: hashedPassword});

    res.status(201).send("signup completed");

  } catch (error) {

    res.status(500).send("Error" + error.message);

  }
}


const login = async (req,res)=>{

    try{
        validateuser(req.body);

        const {email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(401).send("Invalid credentials");

        const isMatch = await bcrypt.compare(password,existingUser.password);
        if(!isMatch) return res.status(401).send("Invalid credentials");

        const token = jwt.sign({name : existingUser.name, _id:existingUser._id, email : email},
            process.env.SECRET_KEY,
            {expiresIn:'1h'}
        );

        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60 * 1000
        });
    
        res.status(200).send({ message: "Login Successful" });

    }
    catch(error){
        res.status(500).send("Error: " + error.message);
    }

}

const logout = async (req,res) => {

   try{

      res.clearCookie("token",null,{
        httpOnly: true,
        secure: true,
        sameSite: "None"
      });

      res.status(200).send("Logged out successfully");
  
    }catch(err){

         res.status(500).send("Error: " + err);

    }
}

const deleteAccount = async (req,res) => {
  try{
    const userId = req.userId;

    await Note.deleteMany({user: userId});

    await User.findByIdAndDelete(userId);

    res.cookie("token",null,{
        httpOnly: true,
        expires: new Date(Date.now())
    });

    res.status(200).send("User deleted successfully");

  }catch(err){
       res.status(500).send("Error: " + err);
  }
}

module.exports = {signup,login,logout,deleteAccount};
