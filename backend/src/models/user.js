const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require("dotenv").config();

const userSchema = mongoose.Schema({
    firstName:{
        type : String,
        required:true,
        minLength:3,
        maxLength:20,
    },
    lastName :{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid.");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not enough strong.")
            }
        }
    },
    headline:{
        type:String,
        maxLength:50,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error("Gender data is not valid.")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not valid.");
            }
        }
    },
    about:{
        type:String,
        maxLength:900,
    },
    skills:{
        type:[String],
    }
},
{
    timestamps:true,
}
)

userSchema.methods.getJWT=async function (){
    const user=this;
    const token =await jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn : "1d"});
    return token;
}

userSchema.methods.passwordValidation=async function(passwordByInput){
    const user=this;
    const passwordValid=await bcrypt.compare(passwordByInput, user.password);
    return passwordValid;
}

module.exports=mongoose.model("User",userSchema);