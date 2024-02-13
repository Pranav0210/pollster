const { mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_img: { type: String, required: false },
    polls_created: { type: Number, required: true },
    polls_voted: { type: Number, required: true },
    refreshtoken: { type: String, required: false },
})

module.exports = mongoose.model('User', UserSchema)