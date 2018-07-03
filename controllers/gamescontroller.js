const router = require('express').Router();
const sequelize = require('../db')
const Games = sequelize.import('../models/games');

router.get('/getall', (req, res) => {
    Games.findAll()
        .then(games => res.status(200).json(games))
        .catch(err => res.status(500).json({error: err.errors[0].message}))
})

router.post('/creategame', (req, res) => {
   Games.create({
        location_of_game: req.body.Games.location_of_game,
        time_of_game: req.body.Games.time_of_game,
        date_of_game: req.body.Games.date_of_game,
        description: req.body.Games.description

    })
    .then(games => res.status(200).json(games))
    .catch(err => res.status(500).json({error: err.errors[0].message}))
}) 
module.exports = router;