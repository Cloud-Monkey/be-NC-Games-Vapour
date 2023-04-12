const db = require('../db/connection');

function fetchReviewById(review_id) {
    return db.query(
        `SELECT
            reviews.*,
            CAST(COUNT(comments.comment_id) AS INT) AS comment_count
        FROM reviews
        LEFT JOIN comments ON comments.review_id = reviews.review_id
        WHERE reviews.review_id = $1
        GROUP BY reviews.review_id;`,
        [review_id]
    ).then((review) => {
        if (review.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Error: not found" });
        }
        return review.rows;
    });
};


module.exports = fetchReviewById;