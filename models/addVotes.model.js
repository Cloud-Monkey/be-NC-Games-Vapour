const db = require('../db/connection');

function addVotes(review_id, inc_votes) {   
    return db.query(
        `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
        [
            inc_votes,
            review_id,
        ]
    ).then((review) => {
        return review.rows[0];
    });
};

module.exports = addVotes;