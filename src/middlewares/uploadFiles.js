const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const filetypes = /csv/;
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname))
    if(mimetype && extname){
      return cb(null, true)
    }
    cb("Error: file can be a csv file")
}

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename( req, file, cb){
    cb(null, new Date().getTime()+ path.extname(file.originalname))
  }
})

const uploadFile = multer({
  storage,
  fileFilter
}).array("file");

/*
const upload = multer({
  storage,
  dest: path.join(__dirname, '../public/uploads'),
  // limits: { fileSize: 3000000},
  fileFilter: (req, file, cb) => {
    const filetypes = /csv/;
    const mimetype = filetypes.test(file.mimetype)
    const extname = filetypes.test(path.extname(file.originalname))
    if(mimetype && extname){
      return cb(null, true)
    }
    cb("Error: file can be a csv file")
  }
}).array("file");
*/
module.exports = uploadFile;