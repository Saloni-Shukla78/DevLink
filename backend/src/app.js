const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());

app.post("/signup",async(req,res)=>{
    const user=new User(req.body);
    try{
        await user.save();
        res.status(200).send("Data posted successfully.");
    }catch(err){
        res.status(400).send(err.message);
    }
})

app.get("/user",async(req,res)=>{
    const userEmail=req.body.email;
    try{
        const user=await User.findOne({email:userEmail});
        if(user.length === 0){
            res.status(404).send("User not found.");
        }else{
            res.status(200).send(user);
        }
    }catch(err){
        res.status(400).send("Something went wrong.")
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        res.status(200).send(users);

    }catch(err){
        res.status(400).send("Something went wrong.")
    }


})

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        console.log(userId);
        res.status(200).send("Data deleted successfully.")
    }catch(err){
        res.status(400).send(err.message)
    }
})

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId
    const data=req.body;
    try{
        await User.findByIdAndUpdate(userId,data,{
            runValidators:true,
        }),
        res.status(200).send("Data updated successfully.");

    }catch(err){
        res.status(400).send("Update failed : " + err.message);
    }
})

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is running on 3000 port...");
    });
  })
  .catch(() => {
    console.log("Database connection is not established..");
  });
