const mongoose = require("mongoose");

const userSchem = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    role:{
        type: String,
        default:"user",
    },
    isVerified:{
        type: Boolean,
        default:false,
    }
});

const User = mongoose.model("User",userSchem);
module.exports = User; 