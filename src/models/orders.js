const connection = require('../config/mysql');

const {
  filterQueries,
  paginationQueries,
  sortQueries
} = require('../helper');

const allowedFields = ['reference'];

const selectAllOrders = (urlQueries) => {
  const queryParams = filterQueries(urlQueries, allowedFields) + sortQueries(urlQueries) + paginationQueries(urlQueries);
  const query = `SELECT * FROM orders${queryParams}`;
  return new Promise((resolve, reject) => {
    connection.query(query, (error, result) => {
      if(!error) {
        resolve(result);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
  // const query = `
  // SELECT o.*,
  //   CONCAT( '[', IFNULL(i.a_items, ''), ']' ) AS items,
  //   CONCAT( '[', IFNULL(p.a_payments, ''), ']' ) AS payments
  // FROM orders AS o
  // LEFT JOIN (
  //   SELECT d.id, d.order_id,
  //     GROUP_CONCAT(id SEPARATOR ',') AS a_items
  //   FROM order_details AS d
  //   GROUP BY d.order_id
  // ) AS i ON o.id = i.order_id
  // LEFT JOIN (
  //   SELECT p.id, p.order_id,
  //     GROUP_CONCAT(id SEPARATOR ',') AS a_payments
  //   FROM payments AS p
  //   GROUP BY p.order_id
  // ) AS p ON o.id = p.order_id
  // ${filterQueries(urlQueries, ['reference'])}
  // ${sortQueries(urlQueries)}
  // ${paginationQueries(urlQueries)}`;

  // const result = dbQuery(connection, query).then(r => {
  //   const items = r.map(data => {
  //     const item = data.items;
  //     const payment = data.payments;
  //     if(item !== null || payment !== null) {
  //       data.items = JSON.parse(item);
  //       data.payments = JSON.parse(payment);
  //     } else {
  //       data.items = [];
  //       data.payments = [];
  //     }
  //     return data;
  //   });
  //   return items;
  // }).catch(error => {
  //   console.log(error);
  //   throw new Error(error);
  // });
  // return result;
};

const selectDataOrder = (id) => {
  const query = `SELECT * FROM orders WHERE id = ?`;
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

const insertDataOrder = (data) => {
  const query = `INSERT INTO orders SET ?`;
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

const updateDataOrder = (data, id) => {
  const query = `UPDATE orders SET ? WHERE id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [data, id], (error, result) => {
      if(!error) {
        resolve(result);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const deleteDataOrder = (id) => {
  const query = `DELETE FROM orders WHERE id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (error, result) => {
      if(!error) {
        resolve(result);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const selectAllOrderItems = (params) => {
  const queryParams = sortQueries(params) + paginationQueries(params);
  const { order_id } = params;
  const query = `SELECT * FROM order_details WHERE order_id = ?${queryParams}`;
  return new Promise((resolve, reject) => {
    connection.query(query, [order_id], (error, result) => {
      if(!error) {
        resolve(result);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const selectDataOrderItem = (id) => {
  const query = `SELECT * FROM order_details WHERE id = ?`;
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

const insertDataOrderItem = (data) => {
  const query = `INSERT INTO order_details SET ?`;
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

// const updateDataOrderItem = (data, id) => {
// };

const deleteDataOrderItem = (id) => {
  const query = `DELETE FROM order_details WHERE order_id = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [id], (error, result) => {
      if(!error) {
        resolve(result);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

// const selectAllOrderPayments = (urlQueries) => {
// };

// const selectDataOrderPayment = (id) => {
// };

// const insertDataOrderPayment = (data) => {
// };

// const updateDataOrderPayment = (data, id) => {
// };

// const deleteDataOrderPayment = (id) => {
// };

module.exports = {
  selectAllOrders,
  selectDataOrder,
  insertDataOrder,
  updateDataOrder,
  deleteDataOrder,

  selectAllOrderItems,
  selectDataOrderItem,
  insertDataOrderItem,
  // updateDataOrderItem,
  deleteDataOrderItem,
  
  // selectAllOrderPayments,
  // selectDataOrderPayment,
  // insertDataOrderPayment,
  // updateDataOrderPayment,
  // deleteDataOrderPayment
};
