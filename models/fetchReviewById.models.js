const db = require('../db/connection');

function fetchReviewById(review_id) {
    return db.query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id]).then((review) => {
        if (review.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "ID does not exist, please use a valid ID" })
        }
        return review.rows
    });
};


module.exports = fetchReviewById;