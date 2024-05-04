 const express = require("express");
 const app = express();
 const mongoose = require("mongoose");
 const dotenv = require("dotenv");
 const helmet = require("helmet");
 const morgan = require("morgan");
 const userRoute = require("./routes/user");
 const authRoute = require("./routes/auth")
 //const variable = require("./test.js");
 //console.log(variable.MONGO_URL);
 

 dotenv.config();

 mongoose.connect(process.env.MONGO_URL).then(()=>{
   console.log("Mongoose connected")
 }).catch((error)=>{
   console.log(error);
 })

 app.use(express.json());
 app.use(helmet());
 app.use(morgan("common"));


 app.use("/api/users" ,userRoute);
 app.use("/api/auth" ,authRoute);

 app.get("/" ,(req ,res)=>{
  res.send("welcome to homepage");
 });

 app.gety

 app.listen(process.env.PORT , ()=>{
    console.log("Hello server");
 })

 