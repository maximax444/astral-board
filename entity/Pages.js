const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const Pages = sequelize.define("Pages", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    parent_id: { type: DataTypes.INTEGER },
    path: { type: DataTypes.STRING }
})

module.exports = {
    Pages
}