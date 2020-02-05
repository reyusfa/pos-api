const express = require('express');
const Router = express.Router();
const asyncHandler = require('../middleware/async');

const { userValidation } = require('../middleware/validation');

const {
  getAllUsers,
  getAllRoles,
  getUser,
  postUser,
  putUser,
  deleteUser
} = require('../controller/users');

Router
  .get('/', getAllUsers)
  .get('/roles', getAllRoles)
  .get('/:id', getUser)
  .post('/', asyncHandler(userValidation), postUser)
  .put('/:id', putUser)
  .delete('/:id', deleteUser);

module.exports = Router;
