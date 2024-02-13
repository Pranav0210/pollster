const User = require('../models/userModel.js');
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
        const user = await User.findOne({ _id:id })
        res.status(StatusCodes.OK).json(user);
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
    updateUser,
    deleteUser
}