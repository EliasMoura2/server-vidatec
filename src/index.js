if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const app = require('./app');
const PORT = process.env.PORT || 3000;

const main = async ()=>{
  await app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
} 

main();