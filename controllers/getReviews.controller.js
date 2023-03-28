const fetchReviews = require('../models/fetchReviews.model.js');

function getReviews(req, resp, next) {
    fetchReviews().then((review) => {
        resp.status(200).send({ review })
    }).catch((err) => {
        next(err);
    });
};

module.exports = getReviews;
