const User = require('../models/userModel.js');
const Poll = require('../models/pollModel.js');
const Votes = require('../models/votesModel.js');
const { StatusCodes } = require('http-status-codes');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        console.error(`ERR:`, error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ email:id })
        if(user)
        res.status(StatusCodes.OK).json(user);
        else
        res.status(StatusCodes.NOT_FOUND).json({error: "User not found"});
    }
    catch (error) {
        console.error(`ERR:`, error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

const getUserPolls = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({email:id});
        const createdPolls = await Poll.find({created_by:user._id});
        const votedPolls = await Votes.find({voters:user._id});
        console.log(votedPolls)
        res.status(StatusCodes.OK).json({createdPolls,votedPolls});
    }
    catch (error) {
        console.error(`ERR:`, error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


const updateUser = async (req, res) => {
    res.status(statusCodes.NOT_IMPLEMENTED).json({ message: "Feature not implemented" });
}

const deleteUser = async (req, res) => {
    res.status(statusCodes.NOT_IMPLEMENTED).json({ message: "Feature not implemented" });
}

module.exports = {
    getUsers,
    getUser,
    getUserPolls,
    updateUser,
    deleteUser
}