'use strict';
const fs = require('fs')
const dataProfile = JSON.parse(fs.readFileSync('./data/profiles.json'))
dataProfile.map(el => {
  el.createdAt = new Date ()
  el.updatedAt = new Date ()
  return el
})

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ('Profiles', dataProfile, {})
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

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete ('Profiles', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
