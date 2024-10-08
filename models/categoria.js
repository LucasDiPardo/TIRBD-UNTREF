// Model for Categoria
const { sequelize } = require('../conexion/conexion')
const { DataTypes } = require('sequelize')

const Categoria = sequelize.define(
  'Categoria',
  {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
        nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
  },
  {
    tableName: 'Categoria',
    timestamps: false,
  }
)

module.exports = { Categoria }