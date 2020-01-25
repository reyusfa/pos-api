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
  return jsonResponse(res, result);
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  const result = await selectDataCategory(id);
  return jsonResponse(res, result[0]);
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
    return jsonResponse(res, result);
  } catch(error) {
    return jsonError(res, errorBadRequest);
  }
};

const putCategory = async (req, res) => {
  try {
    let data = req.body;
    const { id } = req.params;
    await selectDataCategory(id).then(async category => {
      if(category.id) {
        await updateDataCategory(data, id);
        const result = {
          id,
          ...data
        };
        return jsonResponse(res, result);
      } else {
        return jsonError(res, errorBadRequest);
      }
    }).catch(() =>  {
      const error = {
        code: 400,
        message: `Data category does not exist!`
      };
      return jsonError(res, error);
    });
  } catch(error) {
    return jsonError(res, errorBadRequest);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await selectDataCategory(id).then(async category => {
      if(category.id) {
        await deleteDataCategory(id);
        const result = {
          ...category
        };
        return jsonResponse(res, result);
      } else {
        return jsonError(res, errorBadRequest);
      }
    }).catch(() =>  {
      const error = {
        code: 400,
        message: `Data category does not exist!`
      };
      return jsonError(res, error);
    });
  } catch(error) {
    return jsonError(res, errorBadRequest);
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory
};
