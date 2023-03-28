const fetchReviewById = require('../models/fetchReviewById.models');

function getReviewById(req, resp, next) {
    const { review_id } = req.params
    fetchReviewById(review_id).then((review) => {
        resp.status(200).send({ review })
    }).catch((err) => {
        next(err);
    });
};

module.exports = getReviewById;
