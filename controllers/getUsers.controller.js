const { fetchUsers } = require('../models/fetchUsers.model.js');

function getUsers(req, resp, next) {
    fetchUsers(req.body).then((users) => {
        resp.status(200).send({ users })
    }).catch((err) => {
        next(err);
    });
};

module.exports = { getUsers };
