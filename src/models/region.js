const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Region = db.define("Region", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  enterprise_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
});

module.exports = Region;
