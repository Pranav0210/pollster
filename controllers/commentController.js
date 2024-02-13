const Comment = require('../models/commentModel')
const {StatusCodes} = require('http-status-codes')

const createComment = async (req, res) => {
    const { userId, text, reply_to } = req.body;
    const { poll_id } = req.params;
    try {
        const comment = await Comment.create({
            user_id: userId,
            poll_id: poll_id,
            reply_to: reply_to,
            text: text,
            created_at: new Date()
        });
        res.status(StatusCodes.CREATED).json(comment);
    } catch (error) {
        console.error(`ERR:`, error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getComments = async (req,res) => {
    try{
        const comments = await Comment.find()
        res.status(StatusCodes.OK).json(comments)
    }catch(err){
        console.log(`ERR:`, err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"could not get comments"});
    
    }

}

const getReplies = async (req,res) =>{
    const { comment_id } = req.params;

    try{
        const replies = await Comment.find({reply_to:comment_id})
        res.status(StatusCodes.OK).json(replies)
    }catch(error){
        console.log(`ERR:`, error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getCommentsByPoll = async (req, res) => {
    const { poll_id } = req.params;
    try {
        const comments = await Comment.find({ poll_id : poll_id, reply_to: null});
        res.status(StatusCodes.OK).json(comments);
    } catch (error) {
        console.error(`ERR:`, error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getComment =  async (req,res)=>{
    const { comment_id } = req.params;
    try{
        const comment = await Comment.findOne({_id:comment_id})
        if(comment)
            res.status(StatusCodes.OK).json(comment);
        else
            res.status(StatusCodes.NOT_FOUND).json({message:"comment doesn't exist"})
    } catch(err){
        console.log(`ERR:`, err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"could not get comment"});
    }
}

const updateComment = (req,res)=>{
    res.status(StatusCodes.NOT_IMPLEMENTED).json({msg:"action not allowed"})
}
const deleteComment = (req,res)=>{
    res.status(StatusCodes.NOT_IMPLEMENTED).json({msg:"action not allowed"})
}

const deleteComments = (req,res)=>{
    res.status(StatusCodes.NOT_IMPLEMENTED).json({msg:"action not allowed"})
}

module.exports = {
    createComment,
    getComments,
    getReplies,
    getCommentsByPoll,
    getComment,
    updateComment,
    deleteComment,
    deleteComments
}