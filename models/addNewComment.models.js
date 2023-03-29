const db = require('../db/connection');

function addNewComment(review_id, requestBody) {
    const createdAt = new Date().toISOString();
    const { body, username } = requestBody;
    const parsedReviewId = parseInt(review_id);
    return db.query(
        `INSERT INTO comments(body, author, review_id, created_at, votes) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [
            body,
            username,
            parsedReviewId,
            createdAt,
            0,
        ]
    ).then((comment) => {
        return comment.rows[0];
    });
};

module.exports = addNewComment;