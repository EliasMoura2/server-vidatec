const Movie = require('./../models/movie');

const getMovies = async () => {
  try {
    const movies = await Movie.find({});
    return movies;
  } catch (error) {
    console.error(error.message)
  }
};


module.exports = {
  getMovies
}