import { Mongoose, SchemaTypes } from "mongoose";

const CommentSchema = Mongoose.Schema({
    poll_id: { type: SchemaTypes.ObjectId, required: true },
    reply_to: { type: SchemaTypes.ObjectId, required: true },
    user_id: { type: SchemaTypes.ObjectId, required: true },
    text: { type: String, required: true },
},{
    timestamps: true
})

export default Mongoose.model('Comment', CommentSchema)
