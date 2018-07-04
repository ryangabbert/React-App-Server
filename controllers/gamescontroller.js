const router = require('express').Router();
const sequelize = require('../db')
const Games = sequelize.import('../models/games');

router.get('/', (req, res) => {
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
router.put('/updategame/:id', (req, res) => {
        var games = req.params.id; //3
        var Games = req.body.Games.item; //4
    
        Games
            .update({ //5
                location_of_game: req.body.Games.location_of_game,
                time_of_game: req.body.Games.time_of_game,
                date_of_game: req.body.Games.date_of_game,
                description: req.body.Games.description
            },
            {where: {id: games}} //7
            ).then(
                function updateSuccess(updatedLog) { //8
                    res.json({
                        location_of_game: req.body.Games.location_of_game,
                        time_of_game: req.body.Games.time_of_game,
                        date_of_game: req.body.Games.date_of_game,
                        description: req.body.Games.description
                    });            
                },
                function updateError(err){ //9
                    res.send(500, err.message);
                }
            )
    });
    router.delete('/delete/:id', function(req, res) {
        var gamesDelete = req.params.id; //3
        var gamesId = req.user.id; //4
    
        Games
            .destroy({ //5
                where: { id: gamesDelete, owner: gamesId } //6
            }).then(
                function deleteLogSuccess(gamesDelete){ //7
                    res.send("you removed a log");
                },
                function deleteLogError(err){ //8
                    res.send(500, err.message);
                }
            );
    });
module.exports = router;