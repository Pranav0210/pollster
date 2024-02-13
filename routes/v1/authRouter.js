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

// 4. Protected route
authRouter.post('/protected', async (req, res) => {
    try {
      const userId = isAuth(req);
      if (userId !== null) {
        res.send({
          data: 'This is protected data.',
        });
      }
    } catch (err) {
      res.send({
        error: `${err.message}`,
      });
    }
});
  
module.exports = authRouter