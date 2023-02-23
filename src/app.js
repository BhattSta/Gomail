require('dotenv').config();
const express = require('express');
const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
// app.use(express.urlencoded({ extended: false }));

module.exports = app;