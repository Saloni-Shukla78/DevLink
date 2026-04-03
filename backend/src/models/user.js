const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type : String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    lastName :{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
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
        default:"https://api.dicebear.com/9.x/icons/svg?icon=laptop",
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

module.exports=mongoose.model("User",userSchema);