const { sequelize } = require('../conexion/database');
const { DataTypes } = require('sequelize');
const {Contenido} = require('../models/contenido')

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
    tableName: 'Generos',
    timestamps: false,
  }
);

Genero.hasMany(Contenido, { foreignKey: 'id' });

module.exports = { Genero }
