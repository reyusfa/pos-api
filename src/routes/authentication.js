const express = require('express');
const Router = express.Router();

const {
  loginUser,
  registerUser
} = require('../controller/authentication');

Router
  .post('/login', loginUser)
  //.post('/register', registerUser);

module.exports = Router;
