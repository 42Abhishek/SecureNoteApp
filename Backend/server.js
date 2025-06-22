const express = require("express");
const app =new express();

const main = require("./database");
const cors=require('cors');
const userRoutes = require("./routes/routeUser");
const noteRoutes = require("./routes/routeNote");
const cookieParser = require("cookie-parser");

require('dotenv').config();

app.use(cookieParser());


app.use(cors({
      origin : 'https://securenoteapp-frontend.onrender.com',
      credentials : true
}))

app.use(express.json());
app.use(cookieParser());



app.use("/user",userRoutes);
app.use("/note",noteRoutes);

main()
.then(()=>{
    console.log("connected to db")
    app.listen(process.env.PORT,()=>{
        console.log("listening at port 5000");
    })

})
.catch((err)=>console.log(err));
