const fs = require('fs');
const connection = require('../config/mysql');

const {
  dbQuery,
  filterQueries,
  paginationQueries,
  sortQueries
} = require('../helper');

const allowedFields = ['name', 'description'];

const selectAllProducts = (urlQueries) => {
  const queryParams = filterQueries(urlQueries, allowedFields) + sortQueries(urlQueries) + paginationQueries(urlQueries);
  const query = `SELECT * FROM products${queryParams}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if(!error) {
        resolve(result);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const selectDataProduct = (id) => {
  const query = `SELECT * FROM products WHERE id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (error, result) => {
      if(!error) {
        resolve(result[0]);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const insertDataProduct = (data) => {
  const query = `INSERT INTO products SET ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [data], (error, result) => {
      if(!error) {
        resolve(result);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const selectProductImage = (id) => {
  const query = `SELECT image FROM products WHERE id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (error, result) => {
      if(!error) {
        resolve(result[0]);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const selectProductPrice = (id) => {
  const query = `SELECT price FROM products WHERE id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (error, result) => {
      if(!error) {
        resolve(result[0]);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const updateDataProduct = (data, id) => {
  const query = `UPDATE products SET ? WHERE id = ?`;
  const result = selectProductImage(id).then(res => {
    const { image } = res;
    if(image && image !== '' && data.image) {
      fs.unlink(image, (error) => {
        if(error) throw new Error(error);
      });
    }
    return dbQuery(connection, query, [data, id]).catch(error => {
      throw new Error(error);
    });
  }).catch(error => {
    throw new Error(error);
  });
  return result;
};

const deleteDataProduct = (id) => {
  const query = `DELETE FROM products WHERE id = ?`;
  const result = selectProductImage(id).then(res => {
    const { image } = res;
    if(image && image !== '') {
      fs.unlink(image, (error) => {
        if(error) throw new Error(error);
      });
    }
    return dbQuery(connection, query, [id]).catch(error => {
      throw new Error(error);
    });
  }).catch(error => {
    throw new Error(error);
  });
  return result;
};

module.exports = {
  selectAllProducts,
  selectDataProduct,
  insertDataProduct,
  updateDataProduct,
  deleteDataProduct,
  selectProductPrice
};
