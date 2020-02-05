const {
  selectUserLogin,
  insertUserRegister
} = require('../models/authentication');

const {
  jsonResponse,
  jsonError
} = require('../helper');

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const error = {
      code: 400,
      message: 'Invalid username or password!'
    };
    if(!req.body && !username || !password) return jsonError(res, error);
    const result = await selectUserLogin(username, password);
    return jsonResponse(res, result);
  } catch(error) {
    console.log(error.message);
    return jsonError(res, {message: error.message}, error.status);
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password, email, name } = req.body;
    const newPassword = password //await bcrypt.hash(password, 10);
    const data = {
      username,
      email,
      name,
      password: newPassword
    };
    const query = await insertUserRegister(data);
    const id = query.insertId;
    const result = {
      id,
      ...data
    };
    delete result.password;
    return jsonResponse(res, result);
  } catch(error) {
    return jsonError(res, error);
  }
};

module.exports = {
  loginUser,
  registerUser
};
