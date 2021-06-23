const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({msg: 'Hello!'})
})

app.get('*', (req, res) => {
  res.status(404).json({msg: 'Page not found'})
})

module.exports = app;