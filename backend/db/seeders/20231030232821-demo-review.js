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
      userId: 4,
      review: 'Great location with amazing views at night, easy to access to downtown restaurants and pubs. Lisbeth always be here to answer my questions and reply in reasonable time. Will come back and stay again!',
      stars: 4
    },
    {
      spotId: 1,
      userId: 2,
      review: 'Beautiful place with a beautiful view! There is tons of restaurants and stuff to do near by! Lisbeth was helpful and always available to help! ',
      stars: 4
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Had great time staying at Lisbeth place. Place was sparkling clean with all essentials in order. Definitely recommend the place if you are planning a trip to Calgary.',
      stars: 4
    },
    {
      spotId: 2,
      userId: 5,
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
      review:'Everyone in my family (I have a 11 and 13. Year old) agrees that this was one of our top air bnbs. It was so comfortable, clean and relaxing. In addition, the rustic yet clean modern vibe was an added plus. My 13 year old was so happy because of all the vinyls and we loved watching the DVDs. Christmas Vacation, anyone? There was something very special and loved about this home and it felt like an honor to get to be in the house.The house was close to town but felt very remote and private. We were all very sad to leave. Thank you Luke! We hope to be back!',
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
