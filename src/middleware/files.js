const multer = require('multer');
const path = require('path');

const { jsonError } = require('../helper');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images');
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, callback) => {
  let allowedMimes = ['image/jpeg', 'image/png'];
  if(allowedMimes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback({
      success: false,
      message: 'Invalid file type. Only jpg, png image files are allowed.'
    }, false);
  }
};

const config = {
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
};

const upload = multer(config);

const uploadFile = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (error) => {
      if(error) {
        if(!error.success) {
          let errorUpload = {
            code: 400,
            message: error.message
          };
          if(error.code === 'LIMIT_FILE_SIZE') {
            let errorLimit = {
              code: 400,
              message: 'File size is too large!'
            };
            return jsonError(res, errorLimit);
          } else {
            return jsonError(res, errorUpload);
          }
        }
      } else {
        next();
      }
    });
  }
};

module.exports = {
  uploadFile
};

// https://stackoverflow.com/questions/34468395/express-call-a-middleware-from-another-middleware
