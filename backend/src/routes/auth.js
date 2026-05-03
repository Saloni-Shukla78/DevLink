const express=require("express");
const {validationSignup} = require("../utils/validation");
const User=require("../models/user");
const bcrypt= require('bcrypt');
const validator=require("validator");
const authRouter=express.Router();

authRouter.post("/signup",async(req,res)=>{
    try{
        ///Validation of incoming data...
        validationSignup(req);
        const {firstName, lastName, email ,password}=req.body;
        //Encrypt the password...
        const hashPassword=await bcrypt.hash(password,10);
        const user=new User({
            firstName,
            lastName,
            email,
            password:hashPassword,
        })
        const savedUser=await user.save();
         const token=await savedUser.getJWT();
            res.cookie("token" , token);

        res.status(200).json({message:"Sign Up Successfully!",data:savedUser});

    }catch(err){
        res.status(400).send("Error" + err.message);
    }
});

authRouter.post("/login",async(req,res)=>{
    try{
        const { email, password } = req.body;
        //validate email..
        if(!validator.isEmail(email)){
            throw new Error("Invalid credential!");
        }
        //find user..
        const user= await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid credentials.");
        }
        //compare password..
        const isPasswordValid= await user.passwordValidation(password);
        if(isPasswordValid){
            //assign token
            const token=await user.getJWT();
            res.cookie("token" , token);
            res.status(200).send(user);
        }else{
            throw new Error("invalid credentials.");
        }
    }catch(err){
        res.status(400).send("Error : "+err.message);
    }
});

authRouter.post("/logout",async(req,res)=>{
    //expiry the cookie
    res.cookie("token",null,{
        expires : new Date(Date.now()),
    });
    res.status(200).send("Logout successfully!");
})

module.exports=authRouter;