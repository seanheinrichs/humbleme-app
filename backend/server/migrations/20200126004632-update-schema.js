"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("people", "url"),
      queryInterface.removeColumn("people", "image"),
      queryInterface.addColumn("people", "aid", Sequelize.STRING)
    ]);
  }
};
