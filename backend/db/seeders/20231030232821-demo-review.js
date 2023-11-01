'use strict';

const {Review} = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

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
   await Review.bulkCreate([
    {
      spotId: 1,
      userId: 1,
      review: 'pretty nice',
      stars: 4
    },
    {
      spotId: 2,
      userId: 2,
      review:'absolutely amazing',
      stars:5
    },
    {
      spotId: 3,
      userId: 3,
      review: 'kind of run down',
      stars:3
    },
    {
      spotId: 4,
      userId: 4,
      review:'excellent will recommend',
      stars: 5
    },
    {
      spotId: 5,
      userId: 5,
      review:'bad, very overpriced',
      stars: 2
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
