const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Spot, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { DECIMAL } = require('sequelize');
const { INTEGER } = require('sequelize');
const router = express.Router();



//Create new Spot
router.post('/', async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    let errors = {};

    if (!address) errors.address = "Street address is required"
    if (!city) errors.city = "City is required"
    if (!state) errors.state = 'State is required'
    if (!country) errors.country = "Country is required"
    // if (!lat || typeof lat!== INTEGER) errors.lat = "Latitude is not valid"
    // if (!lng || typeof lng!== INTEGER) errors.lng = "Longitude is not valid"
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters"
    if (!description) errors.description = "Description is required"
    if (!price) errors.price = "Price per day is required"

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: errors
        })
    }

    const ownerId = req.user.id

    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });
    res.status(201).json(newSpot)

})

//Get all Spots
router.get('/', async (req,res) => {
    const spots = await Spot.findAll();

    res.json({
        Spots: spots
    })
});

//Get all Spots of Current User

router.get('/current', async (req, res) => {

    const { user } = req

    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    res.json(spots)
})




module.exports = router;
