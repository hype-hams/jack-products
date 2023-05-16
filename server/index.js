// Router calls go here (fill in later)
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('tiny'));

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client/dist')));
module.exports = app;

// const PORT = process.env.PORT || 3000;
// const PORT = process.env.PORT || 3000;

// app.listen(PORT);
// console.log(`Server listening at http://localhost:${PORT}`);
// app.listen(PORT);
// console.log(`Server listening at http://localhost:${PORT}`);

