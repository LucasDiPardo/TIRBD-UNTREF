// Model for Contenido
const { sequelize } = require('../conexion/database')
const { DataTypes } = require('sequelize')
//const { Categoria } = require('./categorias')

const Contenido = sequelize.define(
  'Contenido',
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    poster: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    temporadas: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    trailer: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    genero_id: {
        type: DataTypes.STRING(60),
        allowNull: true,
        default: 'N/A'
    },
  },
  {
    tableName: 'Contenido',
    timestamps: false,
  }
)

//Contenido.belongsTo(Categoria, { foreignKey: "categoria_id"})

module.exports = { Contenido }
