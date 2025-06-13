const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://aryannoob343443:tT5FW9v2jnNRHYVM@cluster2.4babrlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2')
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
