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
  return jsonResponse(res, result);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const result = await selectDataProduct(id);
  return jsonResponse(res, result);
};

const postProduct = async (req, res) => {
  try {
    let data = req.body;
    data.image = req.file ? req.file.path : '';
    const query = await insertDataProduct(data);
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

const putProduct = async (req, res) => {
  try {
    let data = req.body;
    const { id } = req.params;
    if(req.file) {
      data.image = req.file.path;
    }
    await selectDataProduct(id).then(async product => {
      if(product.id) {
        await updateDataProduct(data, id);
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
        message: `Data product does not exist!`
      };
      return jsonError(res, error);
    });
  } catch(error) {
    return jsonError(res, errorBadRequest);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await selectDataProduct(id).then(async product => {
      if(product.id) {
        await deleteDataProduct(id);
        const result = {
          ...product
        };
        return jsonResponse(res, result);
      } else {
        return jsonError(res, errorBadRequest);
      }
    }).catch(() =>  {
      const error = {
        code: 400,
        message: `Data product does not exist!`
      };
      return jsonError(res, error);
    });
  } catch(error) {
    return jsonError(res, errorBadRequest);
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct
};
