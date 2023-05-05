// Router calls go here (fill in later)
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

// controllers
const controllers = require('./controllers');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '../client/dist')));

// product details
// app.get('/', controllers)
// app.post('/', controllers)
// product q_a
// app.get('/', controllers)
// app.post('/', controllers)

// related
app.get('/related/products/:product_id', controllers.related.retrieve);
// app.post('/', controllers);

// reviews
// app.get('/', controllers)
// app.post('/', controllers)

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
