const db = require('../db/connection');

function fetchReviews() {
    return db.query(`SELECT reviews.review_id, reviews.title, reviews.category, reviews.designer, reviews.owner, reviews.review_img_url, reviews.created_at, reviews.votes, CAST(COUNT(comments.review_id) AS INT) AS comment_count FROM reviews LEFT JOIN comments on reviews.review_id = comments.review_id GROUP BY reviews.review_id ORDER BY reviews.created_at DESC;`).then((review) => {
        console.log(review.rows)
        return review.rows
    });
}

module.exports = fetchReviews;
