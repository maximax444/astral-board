const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const Categories = sequelize.define("Categories", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING }
})

module.exports = {
    Categories
}