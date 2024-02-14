const Vote = require('../models/votesModel.js');
const User = require('../models/userModel.js')
const { StatusCodes } = require('http-status-codes');

const addVote = async (req, res) => {
    const { choice, userId } = req.body;
    const { poll_id } = req.params;
    try {
        const voteDocument = await Vote.findOne({ poll_id });
        if (voteDocument) {
            if(voteDocument.voters.includes(req.body.userId)) {
                return res.status(StatusCodes.CONFLICT).json({ message: "User already voted" });
            }
            voteDocument.vote_share.forEach(element => {
                if(element.choice === choice){
                    element.votes++;
                    voteDocument.total_votes++;
                    voteDocument.voters.push(userId);
                } 
            });
            
            await voteDocument.save();

            const user = await  User.findOne({_id:userId});
            user.polls_voted++;
            await user.save();

            res.status(StatusCodes.OK).json(voteDocument);
        } else {
            res.status(StatusCodes.CONFLICT).json({ message: "Vote not found" });
        }
    } catch (error) {
        console.error(`ERR:`, error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getVotes = async (req, res) => {
    try {
        const votes = await Vote.find({});
        res.status(StatusCodes.OK).json(votes);
    } catch (error) {
        console.error(`ERR:`, error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getVotesByPoll = async (req, res) => {
    const { poll_id } = req.params;
    try {
        const votes = await Vote.findOne({ poll_id });
        res.status(StatusCodes.OK).json(votes);
    }
    catch (error) {
        console.error(`ERR:`, error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const updateVote = async (req, res) => {
    //NOT ALLOWED : feature not implemented
    res.status(StatusCodes.NOT_IMPLEMENTED);
}

const deleteVote = async (req, res) => {
    //NOT ALLOWED : feature not implemented
    res.status(StatusCodes.NOT_IMPLEMENTED);
}

module.exports = {
    addVote,
    getVotes,
    getVotesByPoll,
    updateVote,
    deleteVote
}