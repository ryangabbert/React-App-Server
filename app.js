require('dotenv').config();
var express = require('express');
var app = express();
const http = require('http').Server(app); 
var user = require('./controllers/usercontroller');
var games = require('./controllers/gamescontroller');
var team = require('./controllers/teamcontrollers')
var sequelize = require('./db');
var bodyParser = require('body-parser');
sequelize.sync(); // tip: {force: true} for resetting tables
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());


http.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})
app.use('/api/user', user) 
app.use('/api/games', games)
app.use('/api/team', team)
