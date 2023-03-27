const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Roadmap = sequelize.define("Roadmap", {
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
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roadmap_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roadmap: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Roadmap;
