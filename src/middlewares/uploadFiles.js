const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename( req, file, cb){
    cb(null, new Date().getTime()+ path.extname(file.originalname))
  }
})

// app.use(multer({storage}).single('image'))
module.exports = storage;