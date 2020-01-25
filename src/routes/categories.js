const express = require('express');
const Router = express.Router();

const {
  getAllCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory
} = require('../controller/categories');

const { categoryValidation } = require('../middleware/validation');

Router
  .get('/', getAllCategories)
  .get('/:id', getCategory)
  .post('/', categoryValidation, postCategory)
  .put('/:id', categoryValidation, putCategory)
  .delete('/:id', deleteCategory);

module.exports = Router;
