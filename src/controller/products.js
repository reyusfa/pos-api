const {
  selectAllProducts,
  selectDataProduct,
  insertDataProduct,
  updateDataProduct,
  deleteDataProduct
} = require('../models/products');

const {
  jsonResponse,
  jsonError,
  errorBadRequest
} = require('../helper');

const getAllProducts = async (req, res) => {
  const urlQueries = req.query;
  const result = await selectAllProducts(urlQueries);
  jsonResponse(res, result);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const result = await selectDataProduct(id);
  jsonResponse(res, result[0]);
};

const postProduct = async (req, res) => {
  try {
    let data = req.body;
    data.image = req.file.path;
    const query = await insertDataProduct(data);
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

const putProduct = async (req, res) => {
  try {
    let data = req.body;
    data.image = req.file.path;
    const { id } = req.params;
    await updateDataProduct(data, id);
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

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDataProduct(id);
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
  getAllProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct
};
