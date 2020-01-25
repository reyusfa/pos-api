const { jsonError } = require('../helper');

const {
  checkUsername,
  checkEmail
} = require('../models/users');

const usernameIsValid = (username) => {
  const regex = /^(?=.{5,20}$)[a-zA-Z0-9]+(?:[._-][a-zA-Z0-9]+)*$/;
  return regex.test(username);
};

const nameIsValid = (name) => {
  const regex = /^[a-zA-Z0-9 _-]{1,30}$/;
  return regex.test(name);
};

const passwordIsValid = (password) => {
  const regex = /^.{6,40}$/;
  return regex.test(password);
};

const usernameIsExists = async (username) => {
  return await checkUsername(username);
};

const emailIsExists = async (email) => {
  return await checkEmail(email);
};

const userValidation = async (req, res, next) => {
  const { username, email, password, name } = req.body;

  if(!username) {
    const error = {
      code: 400,
      message: 'Username cannot be empty!'
    };
    return jsonError(res, error);
  }

  if(await usernameIsExists(username)) {
    const error = {
      code: 400,
      message: 'Username already exists!'
    };
    return jsonError(res, error);
  }

  if(!usernameIsValid(username)) {
    const error = {
      code: 400,
      message: 'Username is not valid!'
    };
    return jsonError(res, error);
  }

  if(!email) {
    const error = {
      code: 400,
      message: 'Email cannot be empty!'
    };
    return jsonError(res, error);
  }

  if(await emailIsExists(email)) {
    const error = {
      code: 400,
      message: 'Email already exists!'
    };
    return jsonError(res, error);
  }

  if(!name) {
    const error = {
      code: 400,
      message: 'Name cannot be empty!'
    };
    return jsonError(res, error);
  }

  if(!nameIsValid(name)) {
    const error = {
      code: 400,
      message: 'Name is not valid!'
    };
    return jsonError(res, error);
  }

  if(!password) {
    const error = {
      code: 400,
      message: 'Password cannot be empty!'
    };
    return jsonError(res, error);
  }

  if(!passwordIsValid(password)) {
    const error = {
      code: 400,
      message: 'Password is not valid!'
    };
    return jsonError(res, error);
  }

  next();
};

const categoryValidation = (req, res, next) => {
  const { name } = req.body;

  if(!name) {
    const error = {
      code: 400,
      message: 'Category name cannot be empty!'
    };
    return jsonError(res, error);
  }

  next();
};

module.exports = {
  userValidation,
  categoryValidation
}
