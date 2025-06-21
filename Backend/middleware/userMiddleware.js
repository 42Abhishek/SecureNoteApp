const jwt = require("jsonwebtoken");

const userMiddleware = (req,res,next) => {

    const {token} = req.cookies;

    if(!token){
        return res.status(401).send({ error: "Access denied" });
    }

    try{

        const decoded =jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded)
            return res.status(401).send("Not a valid user");

        req.name = decoded.name;
        req.userId = decoded._id;
        req.email = decoded.email;
        next();
    }catch(err){
        res.status(401).send({message: "Invalid token."});
    }
};

module.exports = userMiddleware;