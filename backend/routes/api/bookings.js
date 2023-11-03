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

//Get all current user's bookings
router.get("/current", requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.dataValues.id },
    include: {
      model: Spot,
      attributes: {
        exclude: ["createdAt", "updatedAt", "description"],
      },
    },
  });
  for (let spot of bookings) {
    const previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.Spot.dataValues.id,
        preview: true,
      },
      attributes: ["url"],
    });
    if (previewImage) {
      spot.Spot.dataValues.previewImage = previewImage.dataValues.url;
    }
  }
  return res.json({ Bookings: bookings });
});

//Delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const booking = await Booking.findByPk(bookingId, {
    include: Spot,
  });

  if (booking === null) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  if (booking.dataValues.userId !== req.user.dataValues.id && booking.Spot.dataValues.ownerId !== req.user.dataValues.id) {
    return res.status(403).json({
      message: "Booking can only be deleted by owner of booking",
    });
  }

  const bookingStart = new Date(booking.dataValues.startDate);
  if (bookingStart.getTime() <= Date.now()) {
    return res
      .status(403)
      .json({ message: "Bookings that have been started can't be deleted" });
  }

  await Booking.destroy({
    where: {
      id: booking.Spot.dataValues.id,
    },
  });
  return res.json({ message: "Successfully deleted" });
});

//Edit a booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const {bookingId} = req.params;
  const { startDate, endDate } = req.body;
  const booking = await Booking.findByPk(bookingId);

  if (booking === null) {
    return res.status(404).json({
      message: "Booking couldn't be found",
    });
  }

  if (booking.dataValues.userId !== req.user.dataValues.id) {
    return res.status(403).json({
      message: "Booking can only be deleted by owner of booking",
    });
  }

  const bookingEnd = new Date(booking.dataValues.endDate);
  if (bookingEnd.getTime() <= Date.now()) {
    return res.status(400).json({ message: "Past bookings can't be modified" });
  }

  const spot = await Spot.findByPk(booking.dataValues.spotId, {
    include: Booking
  })

  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  for (let booking of spot.Bookings) {
    let existingStartDate = new Date(booking.startDate);
    let existingEndDate = new Date(booking.endDate);
    let errors = {};
    if (newStartDate >= existingStartDate && newStartDate <= existingEndDate){
      errors.startDate = "Start date conflicts with an existing booking"
      return res.status(403).json({
        message:"Sorry, this spot is already booked for the specified dates",
        errors: errors
      })
    }
    if (newEndDate >= existingStartDate && newEndDate <= existingEndDate){
      errors.endDate = "End date conflicts with an existing booking"
      return res.status(403).json({
        message:"Sorry, this spot is already booked for the specified dates",
        errors: errors
      })
    }
    if (existingStartDate >= newStartDate && existingEndDate <= newEndDate){
      errors.startDate = "Start date conflicts with an existing booking";
      errors.endDate = "End date conflicts with an existing booking"
      return res.status(403).json({
        message:"Sorry, this spot is already booked for the specified dates",
        errors: errors
      })
    }
  }
  await Booking.update(
    {
      startDate,
      endDate,
    },
    {
      where: {
        id: bookingId,
        userId: req.user.dataValues.id,
      },
    }
  );
  const newBooking = await Booking.findByPk(bookingId);
  res.json(newBooking)
});

module.exports = router;
