exports.handlePSQL400s = (err, req, resp, next) => {
    if (err.code === '22P02') {
        resp.status(400).send({ msg: 'Invalid ID!' });
    } else {
        next(err);
    }
};

exports.handleCustomErrors = (err, req, resp, next) => {
    if (err && err.status && err.msg) {
        resp.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

exports.handle500Statuses = (err, req, resp, next) => {
    resp.status(500).send({ msg: 'Server is currently experiencing a technical fault'});
};