const { fetchCategories } = require('../models/fetchCategories.models.js');

function getCategories(req, resp, next) {
    fetchCategories().then((categories) => {
        resp.status(200).send({ categories })
    }).catch((err) => {
        next(err);
    });
};

module.exports = { getCategories };
