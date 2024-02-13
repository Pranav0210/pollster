const {mongoose, SchemaTypes} = require("mongoose")

const PollSchema = mongoose.Schema({
    topic: {type:String, required:true},
    tag : {type:String, required:false},
    created_by: {type:SchemaTypes.ObjectId, required:true},
        
    choices: [
        {
            type: String,
            required: true
        }
    ],
    created_at: {type:Date, required:true},
    closed_at:  {type:Date, required:false}
})

module.exports = mongoose.model('Poll', PollSchema)