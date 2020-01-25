const connection = require('../config/mysql');

const {
  dbQuery,
  filterQueries,
  paginationQueries,
  sortQueries
} = require('../helper');

const allowedFields = ['name'];

const selectAllCategories = (urlQueries) => {
  const queryParams = filterQueries(urlQueries, allowedFields) + sortQueries(urlQueries) + paginationQueries(urlQueries);
  const query = `SELECT * FROM categories${queryParams}`;
  const result = dbQuery(connection, query).catch(error => {
    throw new Error(error);
  });
  return result;
};

const selectDataCategory = (id) => {
  const query = `SELECT * FROM categories WHERE id = ?`;
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

const insertDataCategory = (data) => {
  const query = `INSERT INTO categories SET ?`;
  const result = dbQuery(connection, query, [data]).catch(error => {
    throw new Error(error);
  });
  return result;
};

const updateDataCategory = (data, id) => {
  const query = `UPDATE categories SET ? WHERE id = ?`;
  const result = dbQuery(connection, query, [data, id]).catch(error => {
    throw new Error(error);
  });
  return result;
};

const deleteDataCategory = (id) => {
  const query = `DELETE FROM categories WHERE id = ?`;
  const result = dbQuery(connection, query, [id]).catch(error => {
    throw new Error(error);
  });
  return result;
};

module.exports = {
  selectAllCategories,
  selectDataCategory,
  insertDataCategory,
  updateDataCategory,
  deleteDataCategory
};
