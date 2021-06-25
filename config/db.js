const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost/crud-movies';

const db = mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then((db) => console.log(`DB CONNECTED to ${db.connection.host}`))
  .catch(err => console.error(err))

module.exports = db;