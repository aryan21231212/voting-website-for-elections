const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/vote')
  .then(() => console.log('Connected!'));

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    adharNumber:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
    },
    voted: {
        type: Boolean,
        default: false, 
    }

    
})

const User = mongoose.model("User",userSchema)

module.exports = User
