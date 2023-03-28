const express = require("express");
const { getCategories } = require("./controllers/categories.controller.js");
const getReviewById = require("./controllers/getReviewsById.controller.js");
const getReviews = require("./controllers/getReviews.controller.js")
const { handle404endPoint } = require("./controllers/errorHandlers.controller");
const { handlePSQL400s, handleCustomErrors, handle500Statuses } = require("./controllers/errorControllers.controllers");

const app = express();

app.get('/api/categories', getCategories);

app.get('/api/reviews/:review_id', getReviewById);

app.get('/api/reviews', getReviews);


app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handle500Statuses);

app.all('/*', handle404endPoint);

module.exports = app;
