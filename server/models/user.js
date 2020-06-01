const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"https://res.cloudinary.com/fanani-apps/image/upload/v1589383102/download_wwpzug.png"
    }
})

mongoose.model("User", userSchema)