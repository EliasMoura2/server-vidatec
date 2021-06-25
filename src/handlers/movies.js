const repository = require('./../repositories/movies');
const {getPaginationInfo, getPaginationResult} = require('./../utils/pagination');

const getMovies = async (parameters) => {
  const route = '/api/movies';
  let paginationInfo = getPaginationInfo(parameters);
  let numOfMovies = await repository.totalMovies();
  let movies = await repository.getAll(paginationInfo);
  let result = await getPaginationResult(paginationInfo, route, numOfMovies);
  if(movies.length > 0){
    movies.push({
      totalPages: Math.ceil(numOfMovies / paginationInfo.limit),
      totalItems: numOfMovies,
      currentPage: result.current,
      prevPage: result.prev,
      nextPage: result.next
    });
  }
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