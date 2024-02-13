const Vote = require('../models/votesModel.js');
const { StatusCodes } = require('http-status-codes');

const addVote = async (req, res) => {
    const { poll_id, choice } = req.body;
    try {
        const voteDocument = await Vote.findOne({ poll_id });
        if (vote) {
            const choiceIndex = voteDocument.vote_share.findIndex(v => v.choice === choice);
            if (choiceIndex !== -1) {
                voteDocument.vote_share[choiceIndex].votes += 1;
                voteDocument.total_votes += 1;
            } else {
                voteDocument.vote_share.push({ choice, votes: 1 });
                voteDocument.total_votes += 1;
            }
            await voteDocument.save();
            res.status(200).json(voteDocument);
        } else {
            const newVote = await Vote.create({
                poll_id,
                total_votes: 1,
                vote_share: [{ choice, votes: 1 }],
                voters: [req.user._id]
            });
            res.status(StatusCodes.OK).json(newVote);
        }
    } catch (error) {
        console.error(`ERR:`, error);
        res.status(500);
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