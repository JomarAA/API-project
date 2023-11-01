const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Spot, User, SpotImage, Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DECIMAL } = require("sequelize");
const { INTEGER } = require("sequelize");
const router = express.Router();


//Get all reviews of current user
router.get('/current', requireAuth, async(req, res) => {
    const {user} = req;

    const reviews = await Review.findAll({
        where: {
            userId: user.id,
            include: [
                {
                    model:User
                }
            ]
        }
    })
    res.json(reviews)
})





module.exports = router;
