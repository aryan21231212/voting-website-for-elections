const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://aryannoob343443:tT5FW9v2jnNRHYVM@cluster2.4babrlz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2')
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
