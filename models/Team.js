const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db/connect')
class Team extends Model { }

Team.init(
    {
        // Model attributes are defined here
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        manager: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }


    },
    {
        // Other model options go here
        sequelize: sequelize, // We need to pass the connection instance
        modelName: 'team', // We need to choose the model name
    },
)

module.exports = { Team }
