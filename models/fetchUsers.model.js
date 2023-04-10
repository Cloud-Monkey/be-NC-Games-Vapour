const db = require('../db/connection');

function fetchUsers() {
    return db.query(`SELECT * FROM users;`).then((users) => {
        return users.rows;
    });
};

module.exports = { fetchUsers };