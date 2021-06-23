const router = require('express').Router();
const Movie = require('./../models/movie');

router.get(
  '/movies',
  async (req, res) => {
    const movies = await Movie.find()
    res.status(200).json(movies);
  }
)

router.get('/movies/:id', async (req, res) => {
  res.status(200).json({msg: 'GET /movies/:id'});
});

router.post(
  '/movies',
  async (req, res) => {
    res.status(201).json({msg: 'POST /movies'});
  }
);

router.put(
  '/movies/:id',
  async (req, res) => {
    res.status(200).json({msg: 'PUT /movies/:id'})
  }
);

router.delete(
  '/movies/:id',
  async (req, res) => {
    res.status(200).json({msg: 'DELETE /movies/:id'})
  }
);

module.exports = router;