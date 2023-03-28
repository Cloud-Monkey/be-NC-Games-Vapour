const { fetchCategories } = require('../models/fetchCategories.models.js');

function getCategories(req, resp, next) {
    fetchCategories(req.body).then((categories) => {
        resp.status(200).send({ categories })
    }).catch((err) => {
        next(err);
    });
};

module.exports = { getCategories };
