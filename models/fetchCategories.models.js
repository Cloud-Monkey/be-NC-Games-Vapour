const db = require('../db/connection');

function fetchCategories() {
    return db.query(`SELECT * FROM categories;`).then((categories) => {
        return categories.rows
    });
};

module.exports = { fetchCategories };