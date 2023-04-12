const fetchReviews = require('../models/fetchReviews.model.js');
const fetchReviewsByCategory = require('../models/fetchReviewsByCategory.model.js');

function getReviews(req, resp, next) {
    const queries = req.query;
    const category = queries.category;
    const sortBy = queries.sort_by;
    const orderBy = queries.order;

    if (category) {
        fetchReviewsByCategory(category, sortBy, orderBy).then((review) => {
            resp.status(200).send({ review })
        }).catch((err) => {
            next(err);
        })
    } else {
        fetchReviews(sortBy, orderBy).then((review) => {
            resp.status(200).send({ review })
        }).catch((err) => {
            next(err);
        });
    }
};

module.exports = getReviews;
