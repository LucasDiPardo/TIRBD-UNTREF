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
    contenidoID: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS: true,
    },
    actorID: {
      type: DataTypes.INTEGER,
      FOREIGNKEYS: true,
    },
  },
  {
    tableName: 'ContenidoActorView',
    timestamps: false,
  }
)

Contenido.belongsToMany(Actor, { through: Actor, foreignKey: 'id' })
Actor.belongsToMany(Contenido, { through: Contenido, foreignKey: 'id' })

module.exports = { ContenidoActorView }