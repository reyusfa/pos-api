const fs = require('fs');
const connection = require('../config/mysql');

const {
  dbQuery,
  filterQueries,
  paginationQueries,
  sortQueries
} = require('../helper');

const allowedFields = ['username', 'email', 'name', 'role_id'];

const selectAllUsers = (urlQueries) => {
  const queryParams =
    filterQueries(urlQueries, allowedFields, 'u.') +
    sortQueries(urlQueries, 'u.') +
    paginationQueries(urlQueries);
  const query = `
    SELECT
      u.id,
      u.username,
      u.email,
      u.name,
      u.image,
      u.created_at,
      u.updated_at,
      u.role_id,
      r.name AS role_name
    FROM users AS u
    INNER JOIN roles AS r
      ON u.role_id = r.id
    ${queryParams}`;
  return new Promise((resolve, reject) => {
    connection
      .query(query, (error, result) => {
        if (!error) {
          resolve(result);
        }
      })
      .on('error', error => {
        reject(new Error(error));
      });
  });
};

const countUsers = (urlQueries) => {
  const queryParams = filterQueries(urlQueries, allowedFields) + sortQueries(urlQueries) + paginationQueries(urlQueries);
  const query = `SELECT COUNT(*) AS total_items FROM users${queryParams}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if(!error) {
        resolve(result[0]);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const selectAllRoles = (urlQueries) => {
  const queryParams =
    filterQueries(urlQueries, ['name']) +
    sortQueries(urlQueries) +
    paginationQueries(urlQueries);
  const query = `
    SELECT *
    FROM roles
    ${queryParams}`;
  return new Promise((resolve, reject) => {
    connection
      .query(query, (error, result) => {
        if (!error) {
          resolve(result);
        }
      })
      .on('error', error => {
        reject(new Error(error));
      });
  });
};

const countRoles = (urlQueries) => {
  const queryParams = filterQueries(urlQueries, ['name']) + sortQueries(urlQueries) + paginationQueries(urlQueries);
  const query = `SELECT COUNT(*) AS total_items FROM roles${queryParams}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if(!error) {
        resolve(result[0]);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const selectDataUser = (id) => {
  const query = `SELECT id, username, email, name, image, created_at, updated_at FROM users WHERE id = ?`;
  return new Promise((resolve, reject) => {
    connection
      .query(query, [id], (error, result) => {
        if (!error) {
          resolve(result[0]);
        }
      })
      .on('error', error => {
        reject(new Error(error));
      });
  });
};

const insertDataUser = (data) => {
  const query = `INSERT INTO users SET ?`;
  console.log(query)
  return new Promise((resolve, reject) => {
    connection
      .query(query, [data], (error, result) => {
        if (!error) {
          resolve(result);
        }
      })
      .on('error', error => {
        reject(new Error(error));
      });
  });
};

const selectUserImage = (id) => {
  const query = `SELECT image FROM users WHERE id = ?`;
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

const updateDataUser = (data, id) => {
  const query = `UPDATE users SET ? WHERE id = ?`;
  const result = selectUserImage(id).then(res => {
    const { image } = res;
    if(image && image !== '' && data.image && fs.existsSync(image)) {
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

const deleteDataUser = (id) => {
  const query = `DELETE FROM users WHERE id = ?`;
  const result = selectUserImage(id).then(res => {
    const { image } = res;
    if(image && image !== '' && fs.existsSync(image)) {
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

const checkUsername = (match) => {
  const query = `SELECT username FROM users WHERE username = ?`;
  return new Promise((resolve, reject) => {
    connection
      .query(query, [match], (error, result) => {
        if (!error && result[0]) {
          const {username} = result[0];
          if (username === match) {
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      })
      .on('error', error => {
        reject(error);
      });
  });
};

const checkEmail = (match) => {
  const query = `SELECT email FROM users WHERE email = ?`;
  return new Promise((resolve, reject) => {
    connection
      .query(query, [match], (error, result) => {
        if (!error && result[0]) {
          const {email} = result[0];
          if (email === match) {
            resolve(true);
          } else {
            resolve(false);
          }
        } else {
          resolve(false);
        }
      })
      .on('error', error => {
        reject(error);
      });
  });
};

const selectIdUser = (field, match) => {
  const query = `SELECT id FROM users WHERE ${field} = ?`;
  return new Promise((resolve, reject) => {
    connection
      .query(query, [match], (error, result) => {
        if (!error) {
          resolve(result[0]);
        }
      })
      .on('error', error => {
        reject(new Error(error));
      });
  });
};

module.exports = {
  selectAllUsers,
  countUsers,
  selectAllRoles,
  countRoles,
  selectDataUser,
  insertDataUser,
  selectUserImage,
  updateDataUser,
  deleteDataUser,
  selectIdUser,
  checkUsername,
  checkEmail,
};
