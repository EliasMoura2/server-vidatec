const { Schema, model } = require('mongoose');

const MovieSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  year: {
    type: Number
  },
  director: {
    type: String
  },
  actors: {
    // type: [String]
    type: String
  },
  created_at: { 
    type: Date,
    default: Date.now
  }
});

module.exports = model('Movie', MovieSchema);