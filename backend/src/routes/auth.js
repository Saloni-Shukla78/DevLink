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
        await user.save();
        res.status(200).send("Sign Up Successfully!");

    }catch(err){
        res.status(400).send("Error" + err.message);
    }
})

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
        if(!isPasswordValid){
            //assign token
            const token=await user.getJWT();
            res.cookie("Token : ",token);
            res.status(200).send("Login successsfully!");
        }else{
            throw new Error("Invalid credentials.");
        }
    }catch(err){
        res.status(400).send("Error : "+err.message);
    }
});


module.exports=authRouter;