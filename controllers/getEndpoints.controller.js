const endpointsJson = require('../endpoints.json');

function getEndpoints(req, resp, next) {
   try {
    resp.status(200).send(endpointsJson);
   } catch (err) {
    next(err);
   }
};

module.exports = getEndpoints;
