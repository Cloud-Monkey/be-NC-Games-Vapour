const addNewComment = require("../models/addNewComment.models");
const checkIfAuthorExists = require("../models/checkIfAuthorExists.models");

function postNewComment(req, resp, next) {
    const { review_id } = req.params;
    // check if there is a body key in the posted request
    if (!req.body.body) {
        resp.status(400).send({ msg: "No comment given" });
    }
    // check if there is a username key in the posted request
    else if (!req.body.username) {
        resp.status(400).send({ msg: "Username has not been given" });
    }
    // now I know I have what I need for the post
    else {
        Promise.all([
            checkIfAuthorExists(req.body.username),
            addNewComment(review_id, req.body),
        ]).then((comment) => {
            resp.status(201).send(comment[1]);
        }).catch((err) => {
            next(err);
        });
    };
};

module.exports = postNewComment;
