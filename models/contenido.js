const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");
const { Genero } = require("../models/genero");
const {Categoria} = require("../models/categoria")

const Contenido = sequelize.define(
  "Contenido",
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Contenido",
    timestamps: false,
  }
);

Contenido.belongsTo(Genero, { foreignKey: "genero_id" });
Contenido.belongsTo(Categoria, { foreignKey: "categoria_id" });

module.exports = { Contenido };
