const { Sequelize } = require("sequelize");
// const dotenv = require("dotenv");

// // let envFile;
// // switch (process.env.NODE_ENV) {
// //   case "production":
// //     envFile = ".env.production";
// //     break;
// //   case "local_railway":
// //     envFile = ".env.local_railway";
// //     break;
// //   default:
// //     envFile = ".env.local";
// // }

// dotenv.config({ path: envFile });

const { DBUSER, PASSWORD, HOST, DATABASE, PORT, DIALECT } = process.env;

const sequelize = new Sequelize(DATABASE, DBUSER, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: "mysql",
});

module.exports = { sequelize };
