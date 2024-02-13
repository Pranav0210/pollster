const { Router } = require("express");
const userRouter = require("./userRouter.js")
const pollRouter = require("./pollRouter.js")
const authRouter = require("./authRouter.js")
const votesRouter = require("./votesRouter.js")

const { auth } = require("../../middleware/auth.js");

const api_v1 = Router();
api_v1.use('/auth', authRouter)
api_v1.use('/polls', auth, pollRouter)
api_v1.use('/users', auth, userRouter)
api_v1.use('/votes', auth, votesRouter)

module.exports = api_v1;