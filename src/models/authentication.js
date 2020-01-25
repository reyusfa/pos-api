const connection = require('../config/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const selectUserLogin = (username, password) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [username], (error, result) => {
      console.log(result[0]);
      if(!error && result[0]) {
        bcrypt.compare(password, result[0].password).then((match) => {
          if(match) {
            console.log(match);
            jwt.sign({...result[0]}, 'SECRET_KEY', { algorithm: 'HS256' }, (error, token) => {
              if(!error) {
                console.log(token);
                resolve({token});
              } else {
                reject(new Error('1'));
              }
            });
          } else {
            reject({ code: 401, message: 'Username and password doesn\'t match!' });
          }
        }).catch(error => {
          console.log(error);
          reject(new Error('2'));
        });
      } else {
        reject(new Error('3'));
      }
    }).on('error', (error) => {
      reject(new Error('4'));
    });
  });
};

module.exports = {
  selectUserLogin
};
