const addNewComment = require("../models/addNewComment.models");
const checkIfAuthorExists = require("../models/checkIfAuthorExists.models");

function postNewComment(req, resp, next) {
    const { review_id } = req.params;
        addNewComment(review_id, req.body).then((comment) => {
            resp.status(201).send(comment);
        }).catch((err) => {
            next(err);
        });
    };


module.exports = postNewComment;
