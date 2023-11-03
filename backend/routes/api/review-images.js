const express = require("express");
const { Op, NUMBER } = require("sequelize");
const bcrypt = require("bcryptjs");
const {
  Spot,
  User,
  SpotImage,
  Review,
  ReviewImage,
  Booking,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { DECIMAL } = require("sequelize");
const { INTEGER } = require("sequelize");
const router = express.Router();

//Delete a review image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const {imageId} = req.params;
    const reviewImage = await ReviewImage.findByPk(imageId, {
      include: {
        model: Review,
        attributes: ['userId']
      }
    });
    if (reviewImage === null) {
      return res.status(404).json({
        message: "Review Image couldn't be found",
      });
    };

  if (reviewImage.Review.dataValues.userId !== req.user.dataValues.id) {
     return res.status(403).json({
       message: "Image must belong to current user",
      });
  };
  await ReviewImage.destroy({
    where: {
      id: reviewImage.dataValues.id
    }
  })
  return res.json({message: "Review Image couldn't be found"})
  })


module.exports = router;
