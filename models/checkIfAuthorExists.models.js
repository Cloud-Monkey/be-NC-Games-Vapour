const db = require('../db/connection');

function checkIfAuthorExists(author) {
    return db.query(
        `SELECT * FROM users WHERE username = $1`, [author]
    ).then((authors) => {
        if (authors.rows.length === 0) {
            return Promise.reject({ status: 400, msg: "Author is not valid" });
        }
        return authors.rows;
    }).catch((err) => {
        next(err);
    });
};

module.exports = checkIfAuthorExists;