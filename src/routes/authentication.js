const express = require('express');
const Router = express.Router();
const asyncHandler = require('../middleware/async');

const { userValidation } = require('../middleware/validation');

const {
  loginUser,
  registerUser
} = require('../controller/authentication');

const { uploadFile } = require('../middleware/files');

Router
  .post('/login', loginUser)
  .post('/register', uploadFile('image'), asyncHandler(userValidation), registerUser);

module.exports = Router;
