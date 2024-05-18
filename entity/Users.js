const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Users = sequelize.define("Users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
});

module.exports = {
    Users
};