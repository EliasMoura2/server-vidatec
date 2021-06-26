const Movie = require('./../models/movie');
const { getPaginationParams } = require('./../utils/pagination');

const getAll = async (paginationInfo) => {
  const paginationData = getPaginationParams(paginationInfo);
  const movies = await Movie.find({titulo: {$regex: `${paginationInfo.titulo}`}}, {
    "_id": 1,
    "titulo": 1,
    "genero": 1,
    "año": 1,
    "director": 1,
    "actores": 1
  })
  .skip(paginationData.skip)
  .limit(paginationInfo.limit)
  .sort({titulo: 1})
  return movies;
};

const totalMovies = async (titulo) => {
  let movies = await Movie.countDocuments().where({titulo: { $regex: `${titulo}`}})
  console.log('cant', movies);
  return movies;
}

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

const update = async (id, data) => {
  let movie = await Movie.findByIdAndUpdate(id, data);
  return movie;
};

const remove = async (id) => {
  let movie = await Movie.findByIdAndDelete({_id: id});
  return movie;
}

module.exports = {
  getAll,
  totalMovies,
  getOne,
  create,
  update,
  remove,
}