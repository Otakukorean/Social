const app = require('./app.js');
require('dotenv').config();
const mongoose = require('mongoose');
const db = require('../models');
const {PORT,MONGODB_URL} = process.env;


const startup =async () =>{
    await db.sequelize.sync().then(() => {
          app.listen(PORT , () => {
              console.log(`Listening on port ${PORT}`);
              
          })
      
      })
      
 
}



startup()