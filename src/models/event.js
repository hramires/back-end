const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Event = db.define("Event", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  event_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
});

module.exports = Event;
