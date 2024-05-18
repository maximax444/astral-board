const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Fields = sequelize.define("Fields", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    descr: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING }
});
module.exports = {
    Fields
};