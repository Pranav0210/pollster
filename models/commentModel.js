const { mongoose, SchemaTypes } = require("mongoose");

const CommentSchema = mongoose.Schema({
    poll_id: { type: SchemaTypes.ObjectId, required: true },
    reply_to: { type: SchemaTypes.ObjectId, default: null, required: false },
    user_id: { type: SchemaTypes.ObjectId, required: true },
    text: { type: String, required: true },
    created_at: { type: Date, required: true }
})

module.exports = mongoose.model('Comment', CommentSchema)
