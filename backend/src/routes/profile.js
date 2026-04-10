const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middleware/auth");
const { validationEditProfile } = require("../utils/validation");
const bcrypt=require("bcrypt");
const validator=require("validator");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validationEditProfile(req);
    // const {
    //   firstName,
    //   lastName,
    //   headline,
    //   age,
    //   gender,
    //   skills,
    //   photoUrl,
    //   about,
    // } = req.body;
    const user = req.user;
    const { _id } = user;
    const updatedUser = await User.findByIdAndUpdate(_id, req.body);
    res.json({
      message: "Data updated successfully.",
      data: updatedUser
    });
  } catch (err) {
    res.status(400).send("Error : ", err.message);
  }
});

profileRouter.patch("/profile/passwordEdit",userAuth,async(req,res)=>{
  try{
    const user=req.user;
    const {oldPassword, newPassword} =req.body;
    if(!validator.isStrongPassword(newPassword)){
      throw new Error("Password is not enough strong! Please enter strong password.");
    }
    const isOldPasswordValid=await user.passwordValidation(oldPassword);
    if(isOldPasswordValid){
      const hashPassword=await bcrypt.hash(newPassword,10);
      await User.updateOne({"_id":user._id},{"password": hashPassword});
    }else{
      throw new Error("Wrong Password! Enter correct old password.");
    }
    res.json({
      message: "Password updated successfully.",
    });
  }catch (err) {
    res.status(400).send("Error : "+ err.message);
  }
});

module.exports = profileRouter;
