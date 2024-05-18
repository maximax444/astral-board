const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const Blocks = sequelize.define("Blocks", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    descr: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    fields: { type: DataTypes.STRING }

})
module.exports = {
    Blocks
} 