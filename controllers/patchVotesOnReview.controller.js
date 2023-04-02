const addVotes = require("../models/addVotes.model.js");
const fetchReviewById = require("../models/fetchReviewById.models.js")


function patchVotesOnReview(req, resp, next) {
    const { inc_votes } = req.body
    const { review_id } = req.params;
    Promise.all([
        fetchReviewById(review_id),
         addVotes(review_id, inc_votes),
    ]).then((review) => {
        resp.status(200).send({ review: review[1] })
    }).catch((err) => {
        next(err);
    });
};

module.exports = patchVotesOnReview;