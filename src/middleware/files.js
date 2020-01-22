const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/images');
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

const uploadFile = (fieldName) => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, () => {
      next();
    });
  }
};

module.exports = {
  uploadFile
};

// https://stackoverflow.com/questions/34468395/express-call-a-middleware-from-another-middleware
