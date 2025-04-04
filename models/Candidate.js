const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/vote')
  .then(() => console.log('Connected!'));

const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    party:{
        type:String,
        required:true
    },
    partyDesc:{
        type:String,
        required:true,
    },
    voteCount: {
        type:Number,
        default: 0,
    }

    
})

const Candidate = mongoose.model("Candidate",candidateSchema)

module.exports = Candidate
