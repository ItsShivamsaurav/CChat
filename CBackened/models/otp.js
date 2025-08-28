const {Schema, model} = require("mongoose");

const otpSchema = new Schema({
    email:{
        type:String,
        required:true,              
        unique:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        index:{expires:300} //otp expires in 5 minutes
    }
});     
module.exports = model("Otp", otpSchema);
