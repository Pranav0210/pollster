const { Router } = require('express');
const authController = require('../../controllers/authController.js');

const authRouter = Router();
// 1. Register a user
authRouter.post('/register', authController.register);
  
// 2. Login a user
authRouter.post('/login', authController.login);
  
// 3. Logout a user
authRouter.post('/logout', authController.logout);
  
// 5. Get a new access token with a refresh token
authRouter.post('/refresh-token', authController.refreshToken);

module.exports = authRouter