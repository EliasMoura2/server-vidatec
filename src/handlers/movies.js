const repository = require('./../repositories/movies');

const getMovies = async (data) => {
  const pageSize = parseInt(data.pageSize, 10) || 10;
  const page = parseInt(data.page, 10) || 1;
  const titulo = data.titulo || "";
  let movies = await repository.getAll(pageSize, page, titulo);
  return movies;
}

const getOneMovie = async (id) => {
  const movie = await repository.getOne(id);
  return movie;
};

const createMovie = async movie => {
  const movies = await repository.create(movie);
  return movies;
};

const updateMovie = async (id, updateValues) => {
  let movie = await repository.update(id, updateValues);
  return movie;
};

const deleteMovie = async (id) => {
  const movie = await repository.remove(id);
  return movie;
};

module.exports = {
  getMovies,
  getOneMovie,
  createMovie,
  updateMovie,
  deleteMovie,
}