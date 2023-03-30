const db = require('../db/connection');

function addNewComment(review_id, requestBody) {    
    const { body, username } = requestBody;
    // const parsedReviewId = parseInt(review_id);
   
    return db.query(
        `INSERT INTO comments (body, author, review_id) VALUES ($1, $2, $3) RETURNING *;`,
        [
            body,
            username,
            review_id,
        ]
    ).then((comment) => {
        return comment.rows[0];
    });
};

module.exports = addNewComment;