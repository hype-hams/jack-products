//Router calls go here (fill in later)
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const router = require('./routes.js')

//controllers
// const controllers = require('./controllers');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use('/classes', router)

app.use(express.static(path.join(__dirname, "../client/dist")));

//product details
// Retrieves the list of products
app.get('/products', controllers.details.getProduct);
// Returns all product level information for a specified product id
app.get('/products/:product_id', controllers.details.getProductById);
// Returns the all styles available for the given product
app.get('/products/:product_id/styles', controllers.details.getStyles);
// Returns the id's of products related to the product specified
app.get('/products/:product_id/related', controllers.details.getRelated);
// Adds a product to the cart. format: {'sku_id':xxx, 'count':xxx}
app.post('/cart', controllers.details.addCart);
// Retrieves list of products added to the cart by a user
app.get('/cart', controllers.details.getCart);

// Adds an interation to the db
app.post('/interactions', controllers.details.addInteraction);



const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);