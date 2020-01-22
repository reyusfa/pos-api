const express = require('express');
const Route = express.Router();
const {
  getAllCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory
} = require('../controller/categories');

Route
  .get('/', getAllCategories)
  .get('/:id', getCategory)
  .post('/', postCategory)
  .put('/:id', putCategory)
  .delete('/:id', deleteCategory);

module.exports = Route;
