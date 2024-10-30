const { FOREIGNKEYS } = require('sequelize/lib/query-types')
const { sequelize } = require('../conexion/database')
const { DataTypes } = require('sequelize')
const {Contenido} = require('./contenido')
const {Actor} = require('./actor')


const ContenidoActorView = sequelize.define(
  'ContenidoActorView',
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    contenido_id: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS: true,
    },
    actor_id: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS: true,
    },
  },
  {
    tableName: 'contenido_actor',
    timestamps: false,
  }
)

Contenido.belongsToMany(Actor, { through: ContenidoActorView, foreignKey: 'contenido_id' })
Actor.belongsToMany(Contenido, {
  through: ContenidoActorView,
  foreignKey: "actor_id",
});

module.exports = { ContenidoActorView }