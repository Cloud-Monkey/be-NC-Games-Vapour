const fetchCommentsById = require('../models/fetchCommentsById.model');
const fetchReviewById = require('../models/fetchReviewById.models');

function getCommentsById(req, resp, next) {
    const { review_id } = req.params;

    // check the review_id is associated with a review
    fetchReviewById(review_id).then((review) => {
        // if there is a review, then fetch the comments
        fetchCommentsById(review_id).then((comments) => {
            resp.status(200).send({ comments })
        }).catch((err) => {
            next(err);
        });
    }).catch((err) => {
        next(err);
    });
};

module.exports = getCommentsById;