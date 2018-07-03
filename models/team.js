module.exports = (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
        player_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
            validate: {
                isEmail: true
            }
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    return Team;
}