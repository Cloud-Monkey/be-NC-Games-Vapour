const express = require("express");
const { getCategories } = require("./controllers/categories.controller.js");
const getReviewById = require("./controllers/getReviewsById.controller.js");
const getReviews = require("./controllers/getReviews.controller.js");
const getCommentsByReviewId = require("./controllers/getCommentsById.controller");
const postNewComment = require("./controllers/postNewComment.controllers.js");
const patchVotesOnReview = require("./controllers/patchVotesOnReview.controller.js");
const deleteComment = require("./controllers/deleteComment.controller.js");
const { getUsers } = require("./controllers/getUsers.controller.js");

const { handle404endPoint } = require("./controllers/errorHandlers.controller");
const { handlePSQL400s, handleCustomErrors, handle500Statuses } = require("./controllers/errorControllers.controllers");

const app = express();

app.use(express.json());

app.get('/api/categories', getCategories);
app.get('/api/reviews/:review_id', getReviewById);
app.get('/api/reviews', getReviews);
app.get('/api/reviews/:review_id/comments', getCommentsByReviewId);
app.get('/api/users', getUsers);

app.post('/api/reviews/:review_id/comments', postNewComment);
app.patch('/api/reviews/:review_id', patchVotesOnReview);

app.delete('/api/comments/:comment_id', deleteComment);

app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handle500Statuses);

app.all('/*', handle404endPoint);

module.exports = app;
