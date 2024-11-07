const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
// const { DBUSER, PASSWORD, HOST, DATABASE, PORT } = process.env;
const ENV = process.env.NODE_ENV || "local";

dotenv.config({ path: `.env.${ENV}` });


const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: "mysql",
  }
);


module.exports = { sequelize };






