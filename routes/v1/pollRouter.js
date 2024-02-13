const { Router } = require("express");
const pollController = require("../../controllers/pollController");
const router = Router();

router.route('/')
    .post(pollController.createPoll)
    .get(pollController.getPolls)

router.route('/:id')
    .get(pollController.getPoll)
    .patch(pollController.updatePoll)
    .delete(pollController.deletePoll);


module.exports = router;