const {
  selectUserLogin
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

module.exports = {
  loginUser
};
