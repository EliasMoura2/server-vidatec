const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost/crud-movies';

const db = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`DB CONNECTED`))
  .catch(err => console.error(err))

module.exports = db;