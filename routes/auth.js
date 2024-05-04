const router  = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req ,res)=>{
    //res.send("hey its auth routing")
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password , salt);
        const newUser = new User({
            username:req.body.username,
            password:hashPassword,
            email:req.body.email,
        })
        const  user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err);
    } 
});

router.post("/login" , async (req , res)=>{
    try{
     const user =  await User.findOne({email:req.body.email});
     !user && res.status(404).json("user not found");

     const validpassword = await bcrypt.compare(req.body.password,user.password);
     !validpassword && res.status(404).json("wrong password");

     res.status(200).json(user);

    }catch(err){
        console.log(err);
    }

});
module.exports = router













 // const user = await new User({
    //     username:"john",
    //     email:"john@123",
    //     password:"12345",
    // })
    // await user.save();
    // res.send("ok");