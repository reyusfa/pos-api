const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const app = express();
const router = require('./src/routes');

const HOST = process.env.SERVER_HOST || '127.0.0.1';
const PORT = process.env.SERVER_PORT || '3001';
const ORIGIN = process.env.ORIGIN || '*';

const public = express.static(path.join(__dirname, 'public'));
app.use('/public', public);

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/', router);
app.listen(PORT, HOST, () => {
  console.log(`now listening on http://${HOST}:${PORT}`);
});
