// Model for Genero
const { sequelize } = require('../conexion/conexion')
const { DataTypes } = require('sequelize')

const Genero = sequelize.define(
  'Genero',
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
    tableName: 'Genero',
    timestamps: false,
  }
)

module.exports = { Genero }