const express = require('express');
const {signup,login, logout,deleteAccount} = require("../controller/userHandle");
const userMiddleware = require('../middleware/userMiddleware');
const user = express.Router();

//signup
console.log("userRoute");

user.post('/signup',signup);

//login
user.post('/login',login);

//logout
user.post('/logout',userMiddleware, logout);

//delete account
user.delete('/deleteAccount', userMiddleware, deleteAccount);

user.get("/validate", userMiddleware, (req,res) => {

    const reply = {
        name : req.name,
        email : req.email,
        _id : req._id,  
    }

    res.status(200).json({
        user:reply
    })
})

module.exports = user;