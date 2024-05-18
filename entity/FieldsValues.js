const sequelize = require('../config/db')
const { DataTypes } = require('sequelize')

const FieldsValues = sequelize.define("FieldsValues", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    descr: { type: DataTypes.STRING },
    slug: { type: DataTypes.STRING },
    fieldId: { type: DataTypes.INTEGER },
    blockId: { type: DataTypes.INTEGER },
    value: { type: DataTypes.STRING }
})
module.exports = {
    FieldsValues
} 