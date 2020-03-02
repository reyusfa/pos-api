const {
  selectAllProducts,
  countProducts,
  selectDataProduct,
  insertDataProduct,
  updateDataProduct,
  deleteDataProduct
} = require('../models/products');

const {
  jsonResponse,
  jsonResponseWithPagination,
  jsonError,
  errorBadRequest
} = require('../helper');

const getAllProducts = async (req, res) => {
  const urlQueries = req.query;
  const result = await selectAllProducts(urlQueries)
  .then(products => {
    return products.map(product => {
      return {
        ...product,
        image: `http://${process.env.PUBLIC_IMAGES}/${product.image}`,
      }
    });
  }).catch(console.log);
  delete urlQueries.page
  const count = await countProducts(urlQueries)
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

const getProduct = async (req, res) => {
  const { id } = req.params;
  const result = await selectDataProduct(id).catch(console.log);
  return jsonResponse(res, result);
};

const postProduct = async (req, res) => {
  try {
    let data = req.body;
    data.image = req.file ? req.file.path : '';
    const query = await insertDataProduct(data).catch(console.log);
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
        await updateDataProduct(data, id).catch(console.log);
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
        await deleteDataProduct(id).catch(error => {
          return jsonError(res, {
            code: 400,
            message: `Cannot delete this product!`
          });
        });
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
