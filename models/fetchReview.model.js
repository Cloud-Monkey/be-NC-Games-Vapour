const db = require('../db/connection');

function fetchReview() {
    return db.query(`SELECT reviews.*, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments on reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;`).then((review) => {
        if (review.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "ID does not exist, please use a valid ID" })
        }
        return review.rows
    });
}

module.exports = fetchReview;