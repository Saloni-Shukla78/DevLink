const express=require("express");
const {userAuth} = require("../middleware/auth");
const requestRouter=express.Router();

requestRouter.post("/connection",userAuth,async(req,res)=>{
  try{
    const user=req.user;
    res.status(200).send("Connection request send....")
  }catch(err){
    res.status(400).send("Error : " + err.message);
  }
  const user= req.user;

})

module.exports=requestRouter;