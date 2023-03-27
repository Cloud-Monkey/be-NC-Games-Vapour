exports.handle404endPoint = (req, resp, next) => {
    return resp.status(404).send({ status: 404, msg: 'Error: not found' });
};
