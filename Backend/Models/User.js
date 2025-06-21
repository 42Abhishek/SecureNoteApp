
const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({

    name: {
        type : String,
        require: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }, 
});

const User = mongoose.model('user', userSchema);
module.exports = User;
