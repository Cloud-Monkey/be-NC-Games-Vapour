const addNewComment = require("../models/addNewComment.models");

function postNewComment(req, resp, next) {
    const { review_id } = req.params;
        addNewComment(review_id, req.body).then((comment) => {
            resp.status(201).send({ comment: comment });
        }).catch((err) => {
            next(err);
        });
    };


module.exports = postNewComment;
