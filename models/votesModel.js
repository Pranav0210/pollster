const mongoose = require("mongoose");

const VoteSchema = mongoose.Schema({
    poll_id: {type:mongoose.SchemaTypes.ObjectId, required:true},
    total_votes: {type:Number, required:true},
    vote_share: [
        {
            choice: {type:String, required:true},
            votes: {type:Number, required:true}
        }
    ],
    voters: [
        {type:mongoose.SchemaTypes.ObjectId, required:true}
    ]
})

module.exports = mongoose.model('Vote', VoteSchema)