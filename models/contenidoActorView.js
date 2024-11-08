const { sequelize } = require("../conexion/database");
const { DataTypes } = require("sequelize");

const { Contenido } = require("./contenido");
const { Actor } = require("./actor");

const ContenidoActorView = sequelize.define(
  "ContenidoActorView",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contenido_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Contenido,
        key: "id",
      },
    },
    actor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Actor,
        key: "id",
      },
    },
  },
  {
    tableName: "Contenido_Actor",
    timestamps: false,
  }
);


module.exports = { ContenidoActorView };
