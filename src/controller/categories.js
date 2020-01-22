const {
  selectAllCategories,
  selectDataCategory,
  insertDataCategory,
  updateDataCategory,
  deleteDataCategory
} = require('../models/categories');

const {
  jsonResponse,
  jsonError,
  errorBadRequest
} = require('../helper');

const getAllCategories = async (req, res) => {
  const urlQueries = req.query;
  const result = await selectAllCategories(urlQueries);
  jsonResponse(res, result);
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  const result = await selectDataCategory(id);
  jsonResponse(res, result[0]);
};

const postCategory = async (req, res) => {
  try {
    let data = req.body;
    const query = await insertDataCategory(data);
    const id = query.insertId;
    const result = {
      id,
      ...data
    };
    jsonResponse(res, result);
  } catch(error) {
    jsonError(res, errorBadRequest);
    throw new Error(error);
  }
};

const putCategory = async (req, res) => {
  try {
    let data = req.body;
    const { id } = req.params;
    await updateDataCategory(data, id);
    const result = {
      id,
      ...data
    };
    jsonResponse(res, result);
  } catch(error) {
    jsonError(res, errorBadRequest);
    throw new Error(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDataCategory(id);
    const result = {
      id
    };
    jsonResponse(res, result);
  } catch(error) {
    jsonError(res, errorBadRequest);
    throw new Error(error);
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory
};
