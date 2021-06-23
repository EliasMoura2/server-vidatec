const express = require('express');
const morgan = require('morgan');

const app = express();
require('./../config/db');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', require('./controllers/movies'));

app.get('*', (req, res) => {
  res.status(404).json({msg: 'Page not found'})
});

module.exports = app;