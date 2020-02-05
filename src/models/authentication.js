const connection = require('../config/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const selectUserLogin = (username, password) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [username], (error, result) => {
      //console.log(result[0]);
      if(!error && result[0]) {
        bcrypt.compare(password, result[0].password).then((match) => {
          if(match) {
            //console.log(match);
            jwt.sign({...result[0]}, process.env.SECRET_KEY, { algorithm: 'HS256' }, (error, token) => {
              if(!error) {
                //console.log(token);
                const {id, role_id, name} = result[0];
                resolve({token, id, role_id, name});
              } else {
                reject(new Error('Error!!!!'));
              }
            });
          } else {
            reject({ code: 401, message: `Username and password doesn't match!` });
          }
        }).catch(error => {
          //console.log(error);
          reject(new Error('Error!!!'));
        });
      } else {
        reject(new Error('Error!!'));
      }
    }).on('error', (error) => {
      reject(new Error('Error!'));
    });
  });
};

const insertUserRegister = (data) => {
  const query = `INSERT INTO users SET ?`;
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

module.exports = {
  selectUserLogin,
  insertUserRegister
};
