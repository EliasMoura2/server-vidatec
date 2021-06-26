const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const MovieSchema = new Schema(
  {
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
    }
  },
  {
    timestamps: true
  }
);

MovieSchema.plugin(mongoosePaginate)

module.exports = model('Movie', MovieSchema);