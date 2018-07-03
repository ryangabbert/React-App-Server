module.exports = (sequelize, DataTypes) => {
    const Games = sequelize.define('games', {
        location_of_game: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time_of_game : {
            type: DataTypes.TIME,
            allowNull: false
        },
        date_of_game : {
            type: DataTypes.DATE,
            allowNull: false
        },
        description : {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    })
    return Games;
}