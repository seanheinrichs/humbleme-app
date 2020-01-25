"use strict";
module.exports = (sequelize, DataTypes) => {
  const person = sequelize.define(
    "person",
    {
      url: DataTypes.STRING,
      insult: DataTypes.STRING
    },
    {}
  );
  person.associate = function(models) {
    // associations can be defined here
  };
  return person;
};
