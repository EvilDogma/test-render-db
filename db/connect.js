const { Sequelize } = require('sequelize');

const is_prod = process.env.NODE_ENV

const sequelize = is_prod ? new Sequelize(process.env.DATABASE_URL,
    {
        dialect: 'postgres',
        logging: false
    }) :
    new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'postgres',
            logging: false
        }
    )

module.exports = sequelize