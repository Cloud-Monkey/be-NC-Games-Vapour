const removeComment = require('../models/removeComment.model.js');
const checkIfCommentExists = require("../models/checkIfCommentExists.model.js");

function deleteComment(req, resp, next) {
    const { comment_id } = req.params;
    Promise.all([
        checkIfCommentExists(comment_id),
        removeComment(comment_id),
    ]).then(() => {
        resp.status(204).send({})
    }).catch((err) => {
        next(err);
    });
};

module.exports = deleteComment;

