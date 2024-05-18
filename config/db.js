
const options = require("../options");
const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    options.DBNAME,
    options.DBUSER,
    options.DBPASSWORD,
    {
        dialect: 'mysql',
        dialectModule: require("mysql2"),
        benchmark: true,
        host: options.HOST,
        port: options.PORT
    }
);
