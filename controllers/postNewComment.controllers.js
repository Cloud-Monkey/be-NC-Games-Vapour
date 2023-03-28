const addNewComment = require("../models/addNewComment.models");
const checkIfAuthorExists = require("../models/checkIfAuthorExists.models");

function postNewComment(req, resp, next) {
    const { review_id } = req.params;
    // check if there is a body key in the posted request
    if (!req.body.body) {
        return Promise.reject({ status: 400, msg: "No comment given" });
    }
    // check if there is a username key in the posted request
    if (!req.body.username) {
        return Promise.reject({ status: 400, msg: "Username has not been given" });
    }
    // check if the author actually exists in the author table
    checkIfAuthorExists(req.body.username).then((author) => {
        // now I can post the new comment
        addNewComment(review_id, req.body).then((comment) => {
            resp.status(201).send(comment)
        }).catch((err) => {
            next(err);
        });
    }).catch((err) => {
        next(err);
    });
};

module.exports = postNewComment;
