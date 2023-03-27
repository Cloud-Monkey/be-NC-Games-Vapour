const express = require("express");
const { getCategories } = require("./controllers/categories.controller.js");
const { handle404endPoint } = require("./controllers/errorHandlers.controller");

const app = express();

app.use(express.json());

app.get('/api/categories', getCategories);

app.all('/*', handle404endPoint);

module.exports = app;
