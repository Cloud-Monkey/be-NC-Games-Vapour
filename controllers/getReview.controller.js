const fetchReview = require('../models/fetchReview.model.js');

function getReview(req, resp, next) {
    fetchReview().then((review) => {
        resp.status(200).send({ review })
    }).catch((err) => {
        next(err);
    });
};

module.exports = getReview;

// function getCategories(req, resp, next) {
//     fetchCategories(req.body).then((categories) => {
//         resp.status(200).send({ categories })
//     }).catch((err) => {
//         next(err);
//     });
// };

// module.exports = { getCategories };