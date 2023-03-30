'use strict';

const { HOSPITAL_TABLE, HospitalSchema } = require('../../models/hospital');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(HOSPITAL_TABLE,HospitalSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(HOSPITAL_TABLE);
  }
};
