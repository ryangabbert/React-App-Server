const router = require('express').Router();
const sequelize = require('../db')
const Team = sequelize.import('../models/team');

router.get('/', (req, res) => {
    Team.findAll()
        .then(team => res.status(200).json(team))
        .catch(err => res.status(500).json({error: err.errors[0].message}))
})

router.post('/createteam', (req, res) => {
   Team.create({
        player_name: req.body.Team.player_name,
        email: req.body.Team.email,
        position: req.body.Team.position
    })
    .then(Team => res.status(200).json(Team))
    .catch(err => res.status(500).json({error: err.errors[0].message}))
}) 
module.exports = router;