'use strict';
module.exports = (sequelize, DataTypes) => {
  const niceguy = sequelize.define('niceguy', {
    aid: DataTypes.STRING,
    compliment: DataTypes.STRING
  }, {});
  niceguy.associate = function(models) {
    // associations can be defined here
  };
  return niceguy;
};