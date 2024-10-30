const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");

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



module.exports = { Contenido };
