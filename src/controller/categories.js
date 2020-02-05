const {
  selectAllCategories,
  countCategories,
  selectDataCategory,
  insertDataCategory,
  updateDataCategory,
  deleteDataCategory
} = require('../models/categories');

const {
  jsonResponse,
  jsonResponseWithPagination,
  jsonError,
  errorBadRequest
} = require('../helper');

const getAllCategories = async (req, res) => {
  const urlQueries = req.query;
  const result = await selectAllCategories(urlQueries).then(categories => {
    return categories.map(category => {
      return {
        ...category
      }
    });
  }).catch(console.log);
  delete urlQueries.page
  const count = await countCategories(urlQueries)
  .catch(console.log);
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const total_page = Math.ceil(count.total_items / limit);
  const pagination = {
    ...count,
    page,
    limit,
    total_page
  };
  return jsonResponseWithPagination(res, result, pagination);
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
