const Enterprise = require("../models/enterprise");
const EnterpriseCategory = require("../models/enterpriseCategory");
const Event = require("../models/event");
const Region = require("../models/region");
const Roadmap = require("../models/roadmap");

const associations = () => {
  EnterpriseCategory.hasMany(Enterprise, {
    foreignKey: "enterpriseCategory_id",
  });
  Enterprise.belongsTo(EnterpriseCategory, {
    foreignKey: "enterpriseCategory_id",
  });

  Enterprise.hasMany(Event, { foreignKey: "enterprise_id" });
  Event.belongsTo(Enterprise, { foreignKey: "enterprise_id" });

  Region.hasMany(Enterprise, { foreignKey: "region_id" });
  Enterprise.belongsTo(Region, { foreignKey: "region_id" });

  Region.hasMany(Event, { foreignKey: "region_id" });
  Event.belongsTo(Region, { foreignKey: "region_id" });

  Enterprise.hasMany(Roadmap, { foreignKey: "enterprise_id" });
  Roadmap.belongsTo(Enterprise, { foreignKey: "enterprise_id" });

  Region.hasMany(Roadmap, { foreignKey: "region_id" });
  Roadmap.belongsTo(Region, { foreignKey: "region_id" });
};

module.exports = associations;
