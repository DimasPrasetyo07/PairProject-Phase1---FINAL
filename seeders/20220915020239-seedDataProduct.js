'use strict';
const fs = require('fs')
const dataProduct = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'))
dataProduct.map(el => {
  el.createdAt = new Date ()
  el.updatedAt = new Date ()
  return el
})
console.log(dataProduct)

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Products', dataProduct, {})
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
    return queryInterface.bulkDelete('Products', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
