const Movie = require('./../models/movie');
const { getPaginationParams } = require('./../utils/pagination');

const getAll = async (titulo) => {
  // const paginationData = getPaginationParams(paginationInfo, 'created_at');
  // const result = await Category.findAndCountAll({
  //   ...paginationData,
  //   attributes: ['name'],
  // });
  // return result;

  // db.movies.find({titulo: {$regex: 'Toy'}}).pretty()

  const movies = await Movie.find({}, {
    "_id": 1,
    "titulo": 1,
    "genero": 1,
    "año": 1,
    "director": 1,
    "actores": 1
  }).limit('');
  return movies;
};

const getOne = async (id) => {
  let movie = await Movie.findOne({_id: id}, { 
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
  let movie = await Movie.findByIdAndDelete({_id: id});
  return movie;
}

module.exports = {
  getAll,
  getOne,
  create,
  remove,
}