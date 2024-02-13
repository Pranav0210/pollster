const {Router} = require("express");
const commentController = require("../../controllers/commentController.js")

const router = Router();

router.route('/')
.get(commentController.getComments)

router.route('/poll/:poll_id')
    .post(commentController.createComment)
    .get(commentController.getCommentsByPoll)
    .delete(commentController.deleteComments)

router.route('/:comment_id')
    .get(commentController.getComment)
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment)

router.route('/:comment_id/replies')
    .get(commentController.getReplies)

module.exports = router;