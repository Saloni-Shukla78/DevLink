const express = require('express');

const app=express();    //i am creating express js application

app.use("/home", (req,res) => {
    res.send("Hello Everyone from home.");
})
app.use("/test", (req,res) => {
    res.send("Hello Everyone.test ....test");
})

app.listen(3000 , ()=>{
    console.log("My server is running successfully on port 3000");
});