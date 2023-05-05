//Router calls go here (fill in later)
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const router = require('./routes.js')

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));

//Routes
app.use('/api', router)

//Static Files
app.use(express.static(path.join(__dirname, "../client/dist")));



module.exports = app;