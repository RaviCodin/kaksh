const mongoose = require('mongoose')
const validator = require('validator');


const kakshInfoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter  Name"],
        maxlength:[30,"Name can not Exceed more the 30 charecter"],
        // minlength:[4,"please more than 4 charecter"]
    },
   
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
    },
    phone:{
            type:Number,
    },
    place:{
        type:String,
        required:[true,"Please Select Place"]
    },
    audioUrl:String,
    fileUrl:String,

    Date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("kakshinfo",kakshInfoSchema);
