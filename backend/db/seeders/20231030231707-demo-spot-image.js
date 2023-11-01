'use strict';

const {SpotImage} = require('../models')
let options = {};
options.tableName = "SpotImages";

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await SpotImage.bulkCreate([
    {
      url: '../images/download (4).jpeg'
    },
    {
      url: '../images/download (5).jpeg'
    },
    {
      url: '../images/images (1).jpeg'
    },
    {
      url: '../images/images (2).jpeg'
    },
    {
      url: '../images/images.jpeg'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
