const Movie = require('./../models/movie');

const list = async () => {
  const result = await Movie.find({}, {
    "_id": 1,
    "titulo": 1,
    "genero": 1,
    "año": 1,
    "director": 1,
    "actores": 1
  });
  return result;
};

const getOne = async (id) => {
  let movie = await Movie.findById(id, { 
    "_id": 0,
    "titulo": 1,
    "genero": 1,
    "año": 1,
    "director": 1,
    "actores": 1
  });
  return movie;
};

const create = async (movie) => {
  let result = await Movie.create(movie)
  return result;
};

const remove = async (id) => {
  let result = await Movie.findByIdAndDelete({_id: id});
  return result;
}

module.exports = {
  list,
  create,
  remove,
  getOne,
}