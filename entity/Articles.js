const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const { Categories } = require('./Categories');

const Articles = sequelize.define("Articles", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    descr: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    text: { type: DataTypes.TEXT },
    articleImg: {type: DataTypes.STRING}
});
Articles.belongsTo(Categories);
Categories.hasOne(Articles);
module.exports = {
    Articles
};