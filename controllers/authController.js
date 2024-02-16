const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel.js');
const { hash, compare } = require('bcryptjs');
const { verify } = require('jsonwebtoken');
const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require('../util/tokens.js');

const register = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Check if the user exist
      var user = await User.findOne({email : email});
      if (user) throw new Error('User already exist');
      // 2. If not user exist already, hash the password
      const hashedPassword = await hash(password, 10);
      // 3. Insert the user in "database"
      user = await User.create({
        email: email,
        password: hashedPassword,
        username: email.split('@')[0],
        polls_created: 0,
        polls_voted: 0
      });
      res.status(StatusCodes.CREATED).json(user);

    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: `${err.message}`,
      });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Find user in array. If not exist send error
      const user = await User.findOne({email : email});
      if (!user) throw new Error('User does not exist');
      // 2. Compare crypted password and see if it checks out. Send error if not
      const valid = await compare(password, user.password);
      if (!valid) throw new Error('Password not correct');
      // 3. Create Refresh- and Accesstoken
      const accesstoken = createAccessToken(user._id);
      const refreshtoken = createRefreshToken(user._id);
      // 4. Store Refreshtoken with user in "db"
      // Could also use different version numbers instead.
      // Then just increase the version number on the revoke endpoint
      user.refreshtoken = refreshtoken;
      await user.save();
      // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
      sendRefreshToken(res, refreshtoken);
      sendAccessToken(res, req, accesstoken);
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: `${err.message}`,
      });
    }
  };

const logout = async(req, res) => {
    res.clearCookie('refreshtoken', { path: '/api/v1/auth/refresh-token' });
    // Logic here for also remove refreshtoken from db
    const user = await User.findOneAndUpdate({_id : req.userId}, { refreshtoken: '' });
    return res.status(StatusCodes.OK).json({
      message: 'Logged out',
      user : user.email
    });
  };

const refreshToken = async (req, res) => {
    const token = req.cookies.refreshtoken;
    console.log(token);
    // If we don't have a token in our request
    if (!token) return res.send({ accesstoken: '' });
    // We have a token, let's verify it!
    let payload = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.error(`ERR:`,err)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ accesstoken: '' });
    }
    // token is valid, check if user exist
    console.log(payload)
    const user = await User.findOne({_id : payload.userId});
    if (!user) return res.send({ accesstoken: '' });
    // user exist, check if refreshtoken exist on user
    if (user.refreshtoken !== token)
      return res.status(StatusCodes.NOT_FOUND).json({ accesstoken: '' });
    // token exist, create new Refresh- and accesstoken
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    // update refreshtoken on user in db
    // Could have different versions instead!
    user.refreshtoken = refreshtoken;
    await user.save();
    // All good to go, send new refreshtoken and accesstoken
    sendRefreshToken(res, refreshtoken);
    return res.send({ accesstoken });
  };

 module.exports = {
    register,
    login,
    logout,
    refreshToken,
}