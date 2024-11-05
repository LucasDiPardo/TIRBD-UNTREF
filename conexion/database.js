const { Sequelize } = require("sequelize");

const { DBUSER, PASSWORD, HOST, DATABASE, PORT } = process.env;

const sequelize = new Sequelize(DATABASE, DBUSER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: "mysql",
});

module.exports = { sequelize };
