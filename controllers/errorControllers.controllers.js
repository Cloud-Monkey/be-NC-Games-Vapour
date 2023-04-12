exports.handlePSQL400s = (err, req, resp, next) => {
    if (err.code === '22P02' || err.code === '42703') {
        resp.status(400).send({ msg: 'Invalid request!' });
    }
    if (err.code === '23503') {
        resp.status(404).send({ msg: 'Cannot be found!'})
    } 
    if (err.code === '23502') {
        resp.status(400).send({ msg: 'Missing request body key!'})
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