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
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-855265289472667062/original/99f4d83b-7de8-467a-be43-4a5ddd184b24.jpeg?im_w=1200',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-855265289472667062/original/1a2cd065-f0f7-475b-8f6e-2edafe503cc2.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-855265289472667062/original/e6bfdcec-ec38-41a8-ba08-59254454d877.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-855265289472667062/original/2cddcc8e-0a52-40ea-9d40-8a30ed11ed92.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-855265289472667062/original/662181dc-0a23-42c6-8792-b45c6c764610.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://i0.wp.com/www.tripstodiscover.com/wp-content/uploads/2022/03/Navarro-Guest-House.jpg?resize=784%2C521',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://www.reviewjournal.com/wp-content/uploads/2016/06/web1_airbnblasvegas_6598677.jpg?w=640',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-18328540/original/f0527561-b693-4b41-afde-a98f001a268a.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://vtrips.com/image/webp/fit/735/468/85/https%3A%2F%2Ftrack-pm.s3.amazonaws.com%2Fvrp%2Fimage%2F9c1094aa-f42d-4360-ab03-0341a2ab7706',
      preview:true
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
