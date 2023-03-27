const { Sequelize } = require("sequelize");

const db = new Sequelize("mydb", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = db;
