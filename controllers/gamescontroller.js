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
    .then(Games => res.status(200).json(Games))
    .catch(err => res.status(500).json({error: err.errors[0].message}))
}) 
router.put('/updategame/:id', (req, res) => {
        var games = req.params.id; 
        var Location = req.body.Games.location_of_game; 
        var Time = req.body.Games.time_of_game; 
        var Date = req.body.Games.date_of_game; 
        var Description = req.body.Games.description; 

        Games
            .update({ 
                Location: location_of_game,
                Time: time_of_game,
                Date: date_of_game,
                Description: description
            },
            {where: {id: games}} 
            ).then(
                function updateSuccess(updatedGames) { 
                    res.json({
                        Location: location_of_game,
                        Time: time_of_game,
                         Date: date_of_game,
                        Description: description
                    });            
                },
                function updateError(err){ 
                    res.send(500, err.message);
                }
            )
    });
    router.delete('/delete', function(req, res) {
        var gamesId = req.body.Games.id; 
    
        Games
            .destroy({ 
                where: { id: gamesId } 
            }).then(
                function deleteLogSuccess(GamesDelete){ 
                    res.send("you removed a log");
                },
                function deleteLogError(err){ 
                    res.send(500, err.message);
                }
            );
    });
module.exports = router;