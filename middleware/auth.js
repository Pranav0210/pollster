const { verify } = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel.js');

/**
 * Auhtorization middleware to provide access to portal and protected routes 
 * Implemets JWT token verification via Bearer token
 * @param {Request} req 
 * @param {Resposne} res 
 * @param {NextFunction} next 
 * @returns Response.status(401) if no token is provided
 */

const auth = async (req,res,next) => {
  try{
    const authorization = req.headers['authorization'];
    if (!authorization) 
      return res.status(StatusCodes.UNAUTHORIZED).send({error: "You need to login first"});
    // Based on 'Bearer ksfljrewori384328289398432'
    
    const token = authorization.split(' ')[1];
    const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    const user = await User.findOne({_id:userId});
    if(user){
      req.body.userId = userId;
      console.log("Authorized: passing to controller...");
      next();
    }
    else{
      res.status(StatusCodes.FORBIDDEN).json({error: "Invalid userId"});
    }
  }
  catch(error){
    console.log("error in auth",error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "PLease try again later"});
  }
};

module.exports = {
  auth,
};
