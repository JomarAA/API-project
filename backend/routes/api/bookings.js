const express = require("express");
const { Op, NUMBER } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DECIMAL } = require("sequelize");
const { INTEGER } = require("sequelize");
const router = express.Router();


//Get all current user's bookings
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where:{ userId: req.user.dataValues.id
    },
    include: {
        model: Spot,
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'description']
        }
     }
    })
    for (let spot of bookings) {
        const previewImage = await SpotImage.findOne({
            where: {
                spotIt: spot.Spot.dataValues.id,
                preview:true
            },
            attributes: ['url']
        })
        if (previewImage) {
            spot.Spot.dataValues.previewImage = previewImage.dataValues.url;
        }
    }
    return res.json({Bookings: bookings})
})


module.exports = router;
