const mongoose = require("mongoose");
require('dotenv').config();

async function main(){
    try{
        await mongoose.connect(process.env.DB_CONNECT_KEY);
        console.log("Connected to MongoDB successfully");
    }
    catch(err){
        console.error("Error connecting to MongoDB:", err);
    }
    
}

module.exports = main;
