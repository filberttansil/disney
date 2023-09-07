"use strict";
const data = require("../db/casts.json");
const casts = data.map((el) => {
  delete el.id;
  el.createdAt = new Date();
  el.updatedAt = new Date();
  return el;
});
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Casts", casts, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Casts", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

// REDUCER DULU BARU NAIK KEATAS
// BIKIN SELECTOR DLU

// STORE - ACTIONTYPE - ACTIONCREATOR - REDUCER
// REDUCER - STORE - SELECTOR - ACTION
