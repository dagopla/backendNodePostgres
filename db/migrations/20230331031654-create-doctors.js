'use strict';

const { DOCTOR_TABLE, DoctorSchema } = require('../../models/doctor');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(DOCTOR_TABLE,DoctorSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(DOCTOR_TABLE);
  }
};
