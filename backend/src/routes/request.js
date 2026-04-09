const express=require("express");
const {userAuth} = require("../middleware/auth");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");
const requestRouter=express.Router();

requestRouter.post("/request/:status/:userId",userAuth,async(req,res)=>{
  try{
   const fromUserId=req.user._id;
   const toUserId=req.params.userId;
   const status=req.params.status;
   const allowedStatus=["interested","ignored"];
   //check allowed status.. 
   if(!allowedStatus.includes(status)){
    throw new Error("Invalid connection status!");
   }
   //Check that user does not send request to yourself..
   if(JSON.stringify(toUserId) === JSON.stringify(fromUserId)){
    throw new Error("You do not send request to yourself.");
   }
   //Check receive present in db or not...
   const toUser=await User.findById(toUserId);
   if(!toUser){
    res.status(404).json({
      message:"User does not found.",
    })
   }
   //If connection request already exist...
   const alreadyExistRequest=await ConnectionRequest.findOne({
    $or:[
      {toUserId,fromUserId},
      {toUserId:fromUserId,fromUserId:toUserId}
    ]
   });
   if(alreadyExistRequest){
    throw new Error("Request already exist!");
   }
   //create new request..
   const connectionRequest=await new ConnectionRequest({
    toUserId,fromUserId,status
   })
   await connectionRequest.save();
   res.status(200).json({
    message:req.user.firstName +" is "+ status+ "  in "+ toUser.firstName,
   })
  }catch(err){
    res.status(400).send("Error : " + err.message);
  }
})

module.exports=requestRouter;