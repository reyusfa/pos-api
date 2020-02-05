const dbQuery = (connection, query, data) => {
  const params = [query, data];
  return new Promise((resolve, reject) => {
    connection.query(...params, (error, result) => {
      if(!error) {
        resolve(result);
      }
    }).on('error', (error) => {
      reject(new Error(error));
    });
  });
};

const filterQueries = (urlQueries, allowedFields, prefix = '') => {
  const { filter } = urlQueries;
  if(!filter || Object.keys(filter).length == 0) return '';

  let filters = allowedFields.map((k) => {
    if(k in filter) {
      // let operator = filter[k].split(':')[0];
      // let value = filter[k].split(':')[1];
      // console.log(operator);
      // console.log(value);
      
      // if(operator && operator !== '' && value) {
      //   if(operator === 'like') return `${k} LIKE '%${value}%'`;
      //   if(operator === 'eq') return `${k} = ${value}`;
      //   if(operator === 'lt') return `${k} < ${value}`;
      //   if(operator === 'gt') return `${k} > ${value}`;
      //   if(operator === 'lte') return `${k} <= ${value}`;
      //   if(operator === 'gte') return `${k} >= ${value}`;
      // }
      return `${prefix}${k} LIKE '%${filter[k]}%'`;
    }
  }).filter(Boolean).join(' AND ');

  let result = filters !== '' ? ` WHERE ${filters}` : '';
  return result;
};

const sortQueries = (urlQueries, prefix = '') => {
  const { sort } = urlQueries;
  if(!sort) return '';

  const sortParams = sort.split(',').map(r => {
    let field = r.split('.')[0];
    let order = r.split('.')[1].toUpperCase();
    return `${prefix}${field} ${order}`;
  }).join(', ');

  const result = ` ORDER BY ${sortParams}`;
  return result;
};

const paginationQueries = (urlQueries) => {
  let { page, limit, offset } = urlQueries;
  page = /[0-9]/.test(page) ? page : undefined;
  limit = /[0-9]/.test(limit) ? limit : undefined;
  offset = /[0-9]/.test(offset) ? offset : undefined;

  if(!limit || !page && !limit || page && offset) return '';

  if(offset) {
    offset = `${offset}, `;
  } else if(page) {
    offset = `${page * limit - limit}, `;
  } else {
    offset = '';
  }

  const result = ` LIMIT ${offset}${limit}`;
  return result;
};

const jsonResponseWithPagination = (response, data, pagination, status = 200) => {
  const result = {
    status,
    data,
    pagination
  };
  return response.status(status).json(result);
};

const jsonResponse = (response, data, status = 200) => {
  const result = {
    status,
    data
  };
  return response.status(status).json(result);
};

const jsonError = (response, error, status = 400) => {
  const result = {
    status,
    error
  };
  return response.status(status).json(result);
};

const errorBadRequest = {
  code: 400,
  message: 'Bad Request'
};

module.exports = {
  dbQuery,
  filterQueries,
  paginationQueries,
  sortQueries,
  jsonResponseWithPagination,
  jsonResponse,
  jsonError,
  errorBadRequest
};
