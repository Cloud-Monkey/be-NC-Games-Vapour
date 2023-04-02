const db = require('../db/connection');

function checkIfCommentExists(comment_id) {
    return db.query(`SELECT comment_id FROM comments WHERE comment_id = $1;`, [comment_id]).then((comments) => {
        if (comments.rows.length === 0) {
            return Promise.reject({ status: 404, msg: "No comments found!" });
        }
        return comments.rows;
    });
};

module.exports = checkIfCommentExists;