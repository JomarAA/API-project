'use strict';
const {Spot} = require('../models')

let options = {};
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
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address:'1234 California St.',
      city: 'Santa Clara',
      state: 'California',
      country: 'United States of America',
      lat: 37.35,
      lng:35.95,
      name: 'Cozy Place',
      description: 'Welcome to Colours by Battistella! Spectacular condo located in the prestigious neighborhood of Beltline, Calgary.This amazing 921 sqft condo (2 Bed+2 Bath) is in a great location just walking distance to shops, restaurants, pubs, parks, cafes, public transportation, 17th Avenue, Stampede grounds, The Saddledome, and its close proximity to the core. With two walls of ceiling to floor windows, you will see spectacular unobstructed downtown views. Relax and enjoy the amazing panoramic views.',
      price: 99.00
    },
    {
      ownerId: 2,
      address: '2222 Fremont St.',
      city: 'San Francisco',
      state: 'California',
      country:'Unites States of America',
      lat: 44.44,
      lng: 111.21,
      name: 'City Apartment',
      description: 'Modern apartment in the city',
      price: 187.22
    },
    {
      ownerId: 3,
      address: '3333 Country Rd.',
      city: 'Palo Alto',
      state: 'California',
      country:'Unites States of America',
      lat: 63.11,
      lng: 97.71,
      name: 'Sunshine Meadows',
      description: 'Barn in the hills',
      price: 87.12
    },
    {
      ownerId: 4,
      address: '3333 Sunshine Ln.',
      city: 'Pheonix',
      state: 'Nevada',
      country:'Unites States of America',
      lat: 127.34,
      lng: -14.91,
      name: 'Downtown Apartment',
      description: 'Small apartment in downtown',
      price: 113.47
    },
    {
      ownerId: 5,
      address: '5555 Burton St.',
      city: 'Los Angeles',
      state: 'California',
      country:'Unites States of America',
      lat: 35.91,
      lng: 35.78,
      name: 'Guest House',
      description: 'This rustic yet luxurious cabin is the perfect place to unplug. Walk through the woods, relax by a fire, and enjoy the food and wine of the Russian River Valley. 10 minutes from the beach. Minutes from Occidental, Graton, Forestville, and Guerneville. House has a full bathroom, bedroom downstairs with a queen bed and one upstairs with two twin beds. 5 acres in the redwoods, trampoline, fire pit area, high-speed Internet.',
      price: 211.17
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options);
  }
};
