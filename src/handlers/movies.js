const repository = require('./../repositories/movies')

const getMovies = async () => await repository.getAll();

const getOneMovie = async (id) => {
  const movie = await repository.getOne(id);
  return movie;
};

const createMovie = async movie => {
  const movies = await repository.create(movie);
  return movies;
};

// const updateMovie = async (id, editedCategory) => {
//   const movie = await repository.update(id, editedCategory);
//   return movie;
// };

const deleteMovie = async (id) => {
  const movie = await repository.remove(id);
  return movie;
};

module.exports = {
  getMovies,
  getOneMovie,
  createMovie,
  // updateMovie,
  deleteMovie,
}