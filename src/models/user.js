const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
