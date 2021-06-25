const router = require('express').Router();
const uploadFile = require('./../middlewares/uploadFiles');
// const { getMovies } = require('./../utils/getMovies');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const repository = require('./../repositories/movies');
const Movie = require('./../models/movie');

router.get(
  '/movies',
  async (req, res) => {
    try{
      let movies = await repository.getMovies();
      res.status(200).json(movies)
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
  uploadFile,
  async (req, res) => {
    try{
      if (req.file == undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }
      let movies = [];
      let { filename } = req.file;

      const pathMovies = path.join(__dirname, `../public/uploads/${filename}`);
    
      // console.log(req.file)
      fs.createReadStream(pathMovies)
        .pipe(csv({ separator: '\t' }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          movies.push(row);
        })
        .on("end", async () => {
          let result = await Movie.create(movies)
            .then(() => {
              res.status(200).send({
                message:
                  "Uploaded the file successfully",
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
            console.log(result)
        });
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