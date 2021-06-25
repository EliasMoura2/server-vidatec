const fs = require('fs');
// const csv = require('fast-csv');
const csv = require('csv-parser');
const path = require('path');
const Movie = require('./../models/movie');

const getMovies = async (file, res) => {
  let movies = [];
  const pathMovies = path.join(__dirname, `../public/uploads/${file.filename}`);

  fs.createReadStream(pathMovies)
    .pipe(csv({ separator: '\t' }))
    .on("error", (error) => {
      throw error.message;
    })
    .on("data", (row) => {
      movies.push(row);
    })
    .on("end", () => {
      Movie.create(movies)
        .then(() => {
          res.status(200).send({
            message:
              "Uploaded the file successfully: " + file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
};

module.exports = { getMovies }