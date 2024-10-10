const { FOREIGNKEYS } = require('sequelize/lib/query-types')
const { sequelize } = require('../conexion/database')
const { DataTypes } = require('sequelize')

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

module.exports = { ContenidoActorView }