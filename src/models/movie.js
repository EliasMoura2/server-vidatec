const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
  titulo: { 
    type: String,
    unique: true
  },
  genero: {
    type: String,
  },
  año: {
    type: Number
  },
  director: {
    type: String
  },
  actores: {
    // type: [String]
    type: String
  },
  created_at: { 
    type: Date,
    default: Date.now
  }
});

module.exports = model('Movie', MovieSchema);