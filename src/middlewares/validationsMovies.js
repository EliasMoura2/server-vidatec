const {check, body, validationResult} = require('express-validator');
const {getByTitle} = require('./../repositories/movies');

let movie;

const putValidationRules = () => {
  return [
    body('titulo').custom(async (value) => {
      movie = await getByTitle(value);
      if(movie) {
        return Promise.reject('Movie already registered');
      }
    }),
    check('titulo')
      .optional()
      .notEmpty()
      .withMessage("titulo can't be empty"),
    check('genero')
      .optional()
      .notEmpty()
      .withMessage("genero can't be empty")
      .isString()
      .withMessage('genero should be string'),
    check('año')
      .optional()
      .notEmpty()
      .withMessage("año can't be empty"),
    check('director')
      .optional()
      .notEmpty()
      .withMessage("director can't be empty")
      .isString()
      .withMessage('director should be string'),
    check('actores')
      .optional()
      .notEmpty()
      .withMessage("actores can't be empty")
      .isString()
      .withMessage('actores should be string'),
  ];
};
const validate = (req, res, next) => {
  if(movie){
    if(req.params.id != movie.id){
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      return res.status(400).json({errors: errors.array()});
    }
  }
  return next();
};

module.exports = {
  putValidationRules,
  validate,
}