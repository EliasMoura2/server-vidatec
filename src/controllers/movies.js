const router = require('express').Router();
const Movie = require('./../models/movie');

router.get(
  '/movies',
  async (req, res) => {
    try{
      const movies = await Movie.find()
      res.status(200).json(movies);
    } catch(error) {
      console.log(error.message)
      res.status(500).json({error: 'Server internal error'})
    }
  }
);

router.get(
  '/movies/:id',
  async (req, res) => {
    try{
      res.status(200).json({msg: 'GET /movies/:id'});
    } catch(error) {
      console.log(error.message)
      res.status(500).json({error: 'Server internal error'})
    }
  }
);

router.post(
  '/movies',
  async (req, res) => {
    try{
      const {title, description} = req.body;
      const newMovie = new Book({title, description}); 
      const movie = await newMovie.save();
      res.status(201).json(movie);
    } catch(error) {
      console.log(error.message)
      res.status(500).json({error: 'Server internal error'})
    }
  }
);

router.put(
  '/movies/:id',
  async (req, res) => {
    try{
      res.status(200).json({msg: 'PUT /movies/:id'})
    } catch(error) {
      console.log(error.message)
      res.status(500).json({error: 'Server internal error'})
    }
  }
);

router.delete(
  '/movies/:id',
  async (req, res) => {
    try{
      res.status(200).json({msg: 'DELETE /movies/:id'})
    } catch(error) {
      console.log(error.message)
      res.status(500).json({error: 'Server internal error'})
    }
  }
);

module.exports = router;