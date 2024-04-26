const { DataTypes, Model } = require('sequelize');
const { hash, compare } = require('bcrypt')
const sequelize = require('../db/connect')

class Player extends Model {
    async validatePass(formPassword) {
        const is_valid = await compare(formPassword, '')

        return is_valid
    }
}

Player.init(
    {
        // Model attributes are defined here
        player_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'user with email already exists'},
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: 6
            },
            allowNull: false
        },
        first_Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        // Other model options go here
        sequelize: sequelize,// We need to pass the connection instance
        hooks: {
            async beforeCreate(user) {
                user.password = await hash(user.password, 10)
            }
        },
        modelName: 'player',
        scopes: {
            withoutPassword: {
              attributes: { exclude: ['password'] },
            }
          } // We need to choose the model name
    },
)

module.exports = { Player }
