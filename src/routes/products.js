const express = require('express');
const Route = express.Router();
const {
  getAllProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct
} = require('../controller/products');
const { uploadFile } = require('../middleware/files');

Route
  .get('/', getAllProducts)
  .get('/:id', getProduct)
  .post('/', uploadFile('image'), postProduct)
  .put('/:id', uploadFile('image'), putProduct)
  .delete('/:id', deleteProduct);

module.exports = Route;
