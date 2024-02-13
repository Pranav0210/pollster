const {Router} = require("express");
const votesController = require("../../controllers/votesController.js")
const router = Router();

router.route('/')
    .get(votesController.getVotes)

router.route('/:poll_id')
    .get(votesController.getVotesByPoll)
    .post(votesController.addVote)
    .patch(votesController.updateVote)
    .delete(votesController.deleteVote)

module.exports = router;