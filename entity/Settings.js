const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const Settings = sequelize.define("Settings", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    descr: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    val: { type: DataTypes.STRING }
})
module.exports = {
    Settings
} 