// Model for Categoria
const { sequelize } = require('../conexion/database')
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
    tableName: 'Categorias',
    timestamps: false,
  }
)

module.exports = { Categoria }