const Movie = require('./../models/movie');

const list = async () => {
  const result = await Movie.find({});
  return result;
};
const create = async (movie) => {
  let result = await Movie.create(movie)
  return result;
}

const remove = async (id) => {
  try {
    let result = await Movie.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  list,
  create,
  remove,
}