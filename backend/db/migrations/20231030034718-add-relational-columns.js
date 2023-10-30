'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('SpotImages', 'spotId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Spots'
      }
    });

    await queryInterface.addColumn('Spots', 'ownerId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users'
      }
    });

    await queryInterface.addColumn('ReviewImages', 'reviewId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Reviews'
      }
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('SpotImages', 'spotId');
    await queryInterface.removeColumn('Spots', 'ownerId');
    await queryInterface.removeColumn('ReviewImages', 'reviewId');
  }
};
