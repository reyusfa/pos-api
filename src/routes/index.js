const express = require('express');
const Route = express.Router();
const products = require('./products');
const categories = require('./categories');
const orders = require('./orders');

Route
  .use('/products', products)
  .use('/categories', categories)
  .use('/orders', orders);

module.exports = Route;
