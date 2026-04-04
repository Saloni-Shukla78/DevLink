const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const {validationSignup} = require("./utils/validation");
const validator = require("validator");
const bcrypt=require('bcrypt');
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    ///Validation of incoming data...
    validationSignup(req);
     const {firstName, lastName, email ,password} = req.body;
   
    //Encrypt the password...
    
    const hashPassword= await bcrypt.hash(password,10);
    const user = new User({firstName, lastName, email ,password:hashPassword});
    await user.save();
    res.status(200).send("Data posted successfully.");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

app.post("/login",async(req,res)=>{
    try{
        const {email ,password}= req.body;
        if(!validator.isEmail(email)){
            throw new Error("Email is not valid");
        }
        const user =await User.findOne({email:email});
        if(!user){
            throw new Error("Email is not exist.")
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(isPasswordValid){
            res.status(200).send("Login Successfully !!");
        }else{
            throw new Error("Password does not match")
        }
    }catch(err){
        res.status(400).send("Error : " + err.msg);

    }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (user.length === 0) {
      res.status(404).send("User not found.");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    console.log(userId);
    res.status(200).send("Data deleted successfully.");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const allowUpdates = [
      "headline",
      "skills",
      "gender",
      "age",
      "about",
      "photoUrl",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowUpdates.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed.");
    }
    if (data?.skills.length > 10) {
      throw new Error("Only 10 Skills are accepted.");
    }
    (await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    }),
      res.status(200).send("Data updated successfully."));
  } catch (err) {
    res.status(400).send("Update failed : " + err.message);
  }
});

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
