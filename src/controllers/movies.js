const router = require('express').Router();
const uploadFile = require('./../middlewares/uploadFiles');
const path = require('path');
const fs = require('fs');
const { unlink } = require('fs-extra');
const csv = require('csv-parser');
const handler = require('./../handlers/movies');
const { putValidationRules, validate } = require('./../middlewares/validationsMovies'); 

router.get(
  '/movies',
  async (req, res) => {
    try{
      let movies = await handler.getMovies(req.query);
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
      const { id } = req.params;
      let movie = await handler.getOneMovie(id);
      if(!movie){
        return res.status(404).json({msg: 'Movie not found!'})
      }
      res.status(200).json(movie);
    } catch(error) {
      console.log(error.message)
      res.status(500).json({error: 'Server internal error'})
    }
  }
);

router.post(
  '/movies',
  uploadFile,
  async (req, res) => {
    try{
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }
      let movies = [];
      let { filename } = req.file;

      const pathMovies = path.join(__dirname, `../public/uploads/${filename}`);
    
      fs.createReadStream(pathMovies)
        .pipe(csv({ separator: '\t' }))
        .on("error", error => {throw error.message})
        .on("data", (row) => { movies.push(row)})
        .on("end", async () => {
          try {
            await handler.createMovie(movies)
            res.status(200).json({
              message: "Uploaded the file successfully",
            });
          } catch (error) {
            console.error(error.message)
            res.status(500).json({
              message: "Fail to import some data into database!",
            });
          }
        });

      unlink(path.resolve(pathMovies));
    } catch(error) {
      console.error(error.message)
      res.status(500).json({error: 'Server internal error'})
    }
  }
);

router.put(
  '/movies/:id',
  putValidationRules(),
  validate,
  async (req, res) => {
    try{
      const { id } = req.params;
      let movieUpdated = await handler.updateMovie(id, req.body);
      if(!movieUpdated){
        res.status(404).json({msg: `Movie not found!`});
        return;
      }
      res.status(200).json({msg: `Movie updated successfully`});
    } catch(error) {
      console.error(error.message);
      res.status(500).json({error: 'Server internal error'});
    }
  }
);

router.delete(
  '/movies/:id',
  async (req, res) => {
    try{
      const { id } = req.params;
      let movieDeleted = await handler.deleteMovie(id);
      if(!movieDeleted){
        res.status(404).json({msg: `Movie not found!`});
        return;
      }
      res.status(200).json({msg: `Movie deleted successfully`});
    } catch(error) {
      console.error(error.message);
      res.status(500).json({error: 'Server internal error'});
    }
  }
);

module.exports = router;