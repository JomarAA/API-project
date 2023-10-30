'use strict';

const {ReviewImage} = require('../models')
let options = {};
options.tableName = "ReviewImages";

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
   await ReviewImage.bulkCreate([
    {
      url: '../images/download (1).jpeg'
    },
    {
      url: '../images/download (2).jpeg'
    },
    {
      url: '../images/download (3).jpeg'
    },
    {
      url: '../images/download.jpeg'
    },
    {
      url: '../images/luxury-vacation-rental-sites-o3.webp'
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
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
