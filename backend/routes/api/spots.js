const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { Spot, User, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { DECIMAL } = require('sequelize');
const { INTEGER } = require('sequelize');
const router = express.Router();



//Create new Spot
router.post('/', requireAuth, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    let errors = {};

    if (!address) errors.address = "Street address is required"
    if (!city) errors.city = "City is required"
    if (!state) errors.state = 'State is required'
    if (!country) errors.country = "Country is required"
    if (!lat || typeof lat !== 'number') errors.lat = "Latitude is not valid"
    if (!lng || typeof lng !== 'number') errors.lng = "Longitude is not valid"
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

    for (let spot of spots) {
        previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ['url']
        });
        if (previewImage) {
            spot.dataValues.previewImage = previewImage.dataValues.url;
        }
    }

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
    for (let spot of spots) {
        previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            },
            attributes: ['url']
        });
        if (previewImage) {
            spot.dataValues.previewImage = previewImage.dataValues.url;
        }
    }

    res.json(spots)
});

//Get Spot details from id
router.get('/:spotId', async (req, res) => {
    const {spotId} = req.params;

    const spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    });

    if (spot === null) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };

    res.json(spot)
});

//Add image to spot from spotId
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const {spotId} = req.params;
    const {url, preview} = req.body;

    const thisSpot = await Spot.findByPk(spotId)

    if (thisSpot === null) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };
    if (thisSpot.ownerId !== req.user.dataValues.id) {
        return res.status(403).json({
            message: 'Image can only be added by Spot Owner'
        })
    }

    const newSpotImage = await SpotImage.create({
        spotId,
        url,
        preview: preview ? true : false
    });
    return res.json({
        id: spotId,
        url: newSpotImage.url,
        preview: newSpotImage.preview
    });
});



module.exports = router;
