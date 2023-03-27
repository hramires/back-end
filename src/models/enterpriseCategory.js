const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const EnterpriseCategory = db.define("EnterpriseCategory", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = EnterpriseCategory;
