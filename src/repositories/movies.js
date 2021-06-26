const Movie = require('./../models/movie');

const getAll = async (pageSize, page, titulo) => {
  const movies = await Movie.paginate(
    {
      titulo: {$regex: `${titulo}`}
    }, {
      select: 'titulo genero año',
      page: `${page}`,
      limit: `${pageSize}`,
    });
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