require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/index')

app.use(express.json());

app.use('/v1', routes);

module.exports = app;