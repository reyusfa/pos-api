const bcrypt = require('bcrypt');

const {
  selectAllUsers,
  selectDataUser,
  insertDataUser,
  updateDataUser,
  deleteDataUser,
  selectIdUser
} = require('../models/users');

const {
  jsonResponse,
  jsonError,
  errorBadRequest
} = require('../helper');

const getAllUsers = async (req, res) => {
  const urlQueries = req.query;
  const result = await selectAllUsers(urlQueries);
  return jsonResponse(res, result);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const result = await selectDataUser(id);
  return jsonResponse(res, result);
};

const postUser = async (req, res) => {
  try {
    const { username, password, email, name } = req.body;
    const data = {
      username,
      email,
      name,
      password: await bcrypt.hash(password, 10)
    };
    const query = await insertDataUser(data);
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

const putUser = async (req, res) => {

};

const deleteUser = async (req, res) => {

};



module.exports = {
  getAllUsers,
  getUser,
  postUser,
  putUser,
  deleteUser
};
