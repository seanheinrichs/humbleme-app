"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("person", "url"),
      queryInterface.removeColumn("person", "image")
    ]);
  }
};
