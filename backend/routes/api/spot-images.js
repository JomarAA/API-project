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

//Delete a spot image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const imageId = req.params.imageId;
  const spotImage = await SpotImage.findByPk(imageId, {
    include: {
      model: Spot,
      attributes: ['ownerId']
    }
  });
  if (spotImage === null) {
    return res.status(404).json({
      message: "Spot Image couldn't be found",
    });
  };

if (spotImage.Spot.dataValues.ownerId !== req.user.dataValues.id) {
   return res.status(403).json({
     message: "Image must belong to current user",
    });
};
await SpotImage.destroy({
  where: {
    id: spotImage.dataValues.id
  }
})
return res.json({message: "Successfully deleted"})
})






module.exports = router
