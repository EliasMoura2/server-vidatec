if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
  console.log(process.env.NODE_ENV)
}
const app = require('./app');
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})