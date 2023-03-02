
const cookieparser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require(
     'cors'
)
const routes = require('./routes/index.js')

const app = express();
app.use(cookieparser())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use( '/anime/Uploads/',express.static('./Media/Uploads'))
app.use( '/anime/video/',express.static('./Media/video'))
app.use( '/anime/ProfileBackground/',express.static('./Media/ProfileBackground'))
app.use('/anime',routes)

module.exports = app;