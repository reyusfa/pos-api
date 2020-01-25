const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'point_of_sale'
});

db.connect((error) => {
  if(error) throw new Error(error);
  // console.log('now connected to database...');
});

module.exports = db;
