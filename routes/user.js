const router  = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
router.get("/",(req ,res)=>{
    res.send("hey its user routing")
})

//upadte user 

router.put("/:id", async(req , res)=>{
     if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt =await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            } );
            res.status(200).json("Account has been upadated");
        }catch(err){
            return res.status(500).json(err);
        }
     }
     else{
        return res.status(403).json("You can update only your account")
     }   
}) 

// delete user 
router.delete("/:id", async(req , res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Acccount has been deleted")
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only delete your Account!");
    }
});
//get a user 
router.get("/:id" , async(req , res )=>{
        try{
            const user = await User.findById(req.params.id);
            const {password , updatedAt , ...other } = user._doc;
             req.status(200).json(other);
        }
        catch(err){
            res.status(500).json(err);
        }
});
//follow a user 
router.put("/:id/follow" , async(req ,res) =>{
    if(req.body.userId !== req.params.id ){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.userId.id);
        }catch(err){

        }
    }
});
//unfollow a user

module.exports = router