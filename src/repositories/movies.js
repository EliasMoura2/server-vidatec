const Movie = require('./../models/movie');

const list = async () => {
  const movies = await Movie.find({}, {
    "_id": 1,
    "titulo": 1,
    "genero": 1,
    "año": 1,
    "director": 1,
    "actores": 1
  });
  return movies;
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
  let movie = await Movie.create(movie)
  return movie;
};

const remove = async (id) => {
  let movie = await Movie.findByIdAndDelete({_id: id});
  return movie;
}

module.exports = {
  list,
  create,
  remove,
  getOne,
}