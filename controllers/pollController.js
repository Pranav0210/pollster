const Poll = require('../models/pollModel.js');
const Votes = require('../models/votesModel.js');
const {StatusCodes} = require('http-status-codes');
const mongoose = require('mongoose');

const createPoll = async (req, res) => {
    const { topic, tag, choices, userId } = req.body;

    try{
        const poll = await Poll.create({
            topic : topic,
            tag : tag,
            choices: choices,
            created_at: new Date(),
            created_by: userId
        });
        res.status(StatusCodes.CREATED).json(poll);
    }
    catch(err){
        console.error(`ERR:`,err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }

};

const deletePoll = async (req, res) => {
    try{
        const { id } = req.params;
        const poll = await Poll.findByIdAndDelete(id);
        const votes = await Votes.findOneAndDelete({poll_id: id})
        res.status(StatusCodes.OK).json({poll,votes});
    }
    catch(error){
        console.error(`ERR:`,err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
};

const getPoll = async (req, res) => {
    const { id } = req.params;
    try{
        const poll = await Poll.findOne({_id:id})
        res.status(StatusCodes.OK).json(poll);
    }
    catch(error){
        console.error(`ERR:`,err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
};

const getPollResults = async (req, res) => {
    
};

const getPolls = async (req, res) => {
    try{
        const polls = await Poll.find({});
        res.status(StatusCodes.OK).json(polls);
    }
    catch(error){
        console.error(`ERR:`,err)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
};
const updatePoll = async (req, res) => {
    //NOT ALLOWED : feature not implemented
    res.status(StatusCodes.NOT_IMPLEMENTED);
}

module.exports = {
    createPoll,
    deletePoll,
    getPoll,
    updatePoll,
    getPolls,
    getPollResults
}