const router = require('express').Router();
const sequelize = require('../db')
const Team = sequelize.import('../models/team');


router.post('/createteam', (req, res) => {
   Team.create({
        player_name: req.body.player_name,
        email: req.body.email,
        postion: req.body.postion
    })
    .then(team => res.status(200).json(team))
    .catch(err => res.status(500).json({error: err.errors[0].message}))
}) 
module.exports = router;