const fetchCommentsById = require('../models/fetchCommentsById.model');
const fetchReviewById = require('../models/fetchReviewById.models');

function getCommentsById(req, resp, next) {
    const { review_id } = req.params;

    Promise.all([
        fetchReviewById(review_id),
        fetchCommentsById(review_id),
    ]).then((comments) => {
        resp.status(200).send({ comments: comments[1] })
    }).catch((err) => {
        next(err);
    });
}

module.exports = getCommentsById;