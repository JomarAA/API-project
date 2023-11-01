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
      reviewId: 1,
      url: '../images/download (1).jpeg'
    },
    {
      reviewId: 2,
      url: '../images/download (2).jpeg'
    },
    {
      reviewId: 3,
      url: '../images/download (3).jpeg'
    },
    {
      reviewId: 4,
      url: '../images/download.jpeg'
    },
    {
      reviewId: 5,
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
