const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
  title: String,
  description: String
});

module.exports = model('movies', movieSchema);