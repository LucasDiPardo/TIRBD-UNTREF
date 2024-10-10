const { sequelize } = require("../conexion/database");
const {DataTypes} = require ('sequelize')

const ContenidoActoresView = sequelize.define(
    'ContenidoActoresView',
    {
        ContenidoID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
        ContenidoName:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        ActorID: {
            type: DataTypes.INTEGER,
            allowNull : false,
            default: 1,
        },
        ActorName:{
            type: DataTypes.STRING,
            allowNull : false,
            }
        },
        {
            tableName: 'contenidoAndActores',
            timestamps: false,
        }
   
)

module.exports = { ContenidoActoresView}