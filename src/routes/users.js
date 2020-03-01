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

const { uploadFile } = require('../middleware/files');

Router
  .get('/', getAllUsers)
  .get('/roles', getAllRoles)
  .get('/:id', getUser)
  .post('/', uploadFile('image'), asyncHandler(userValidation), postUser)
  .put('/:id', uploadFile('image'), putUser)
  .delete('/:id', deleteUser);

module.exports = Router;
