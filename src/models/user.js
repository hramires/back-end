const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
