const jwt = require('jsonwebtoken');
const { jsonError } = require('../helper');

const authorization = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (error) => {
    if(error) {
      const errorResponse = {
        code: 401,
        message: `Unauthorized: ${error.message}`
      };
      return jsonError(res, errorResponse, 401);
    } else {
      next();
    }
  });
};

module.exports = authorization;
