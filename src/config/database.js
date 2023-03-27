const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mydb", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});

// Define the relationships between models
// Region.BelongsTo(Enterprise);
// Enterprise.hasMany(Region);

// Enterprise.belongsTo(EnterpriseCategory);
// EnterpriseCategory.hasMany(Enterprise);

// Enterprise.hasMany(Event);
// Event.belongsTo(Enterprise);

// Event.belongsTo(Region);
// Region.hasMany(Event);

// Roadmap.belongsTo(Enterprise);
// Enterprise.hasMany(Roadmap);

// Roadmap.belongsTo(Region);
// Region.hasMany(Roadmap);

module.exports = sequelize;
