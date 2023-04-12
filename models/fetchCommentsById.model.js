const db = require('../db/connection');

function fetchCommentsById(review_id) {
    return db.query(`SELECT comment_id, votes, created_at, author, body, review_id FROM comments WHERE review_id = $1;`, [review_id]).then((comments) => {
        if (comments.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Error: not found" });
        }
        return comments.rows;
    });
};

module.exports = fetchCommentsById;