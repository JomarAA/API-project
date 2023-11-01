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

//Create new Spot
router.post("/", requireAuth, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  let errors = {};

  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Country is required";
  if (!lat || typeof lat !== "number") errors.lat = "Latitude is not valid";
  if (!lng || typeof lng !== "number") errors.lng = "Longitude is not valid";
  if (!name || name.length > 50)
    errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (!price) errors.price = "Price per day is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  }

  const ownerId = req.user.id;

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
    price,
  });
  res.status(201).json(newSpot);
});

//Get all Spots
router.get("/", async (req, res) => {

  const { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

  let errors = {};

  if (page <= 0) errors.page = "Page must be greater than or equal to 1";
  if (size <= 0) errors.size = "Size must be greater than or equal to 1";
  if (maxLat >= 150 || minLat <= -150) errors.maxLat = "Maximum latitude is not valid";
  if (minLat >= 150 || minLat <= -150) errors.minLat = "Minimum latitude is not valid";
  if (maxLng >= 150 || minLat <= -150) errors.maxLng = "Maximum longitude is not valid";
  if (minLng >= 150 || minLat <= -150) errors.minLng = "Minimum longitude is not valid";
  if (minPrice < 0) errors.minPrice = "Minimum price must be greater than or equal to 0";
  if (maxPrice < 0) errors.maxPrice = "Maximum price must be greater than or equal to 0";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  }

  const queryFilter = {
    where: {},
    limit: Number(size) || 20,
    offset: ((Number(page) || 1) - 1) * (Number(size) || 20),
    lng: {
      [Op.between]: [
        minLng !== null ? minLng: -150,
        maxLng !== null ? maxLng: 150
      ]
    },
    lat: {
      [Op.between]: [
        minLat !== null ? minLat: -150,
        maxLat !== null ? maxLat: 150
      ]
    },
    price: {
      [Op.between]: [
        minPrice !== null ? minPrice: 0,
        maxPrice !== null ? maxPrice: 1001
      ]
    }
  };

  const spots = await Spot.findAll(queryFilter);

  for (let spot of spots) {
    previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
      attributes: ["url"],
    });
    if (previewImage) {
      spot.dataValues.previewImage = previewImage.dataValues.url;
    }
  }

  res.json({
    Spots: spots,
    page: queryFilter.offset,
    size: queryFilter.limit
  });
});

//Get all Spots of Current User
router.get("/current", async (req, res) => {
  const { user } = req;
  const ownerId = req.user.id;

  const spots = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
  });
  for (let spot of spots) {
    previewImage = await SpotImage.findOne({
      where: {
        spotId: spot.id,
        preview: true,
      },
      attributes: ["url"],
    });
    if (previewImage) {
      spot.dataValues.previewImage = previewImage.dataValues.url;
    }
  }

  res.json(spots);
});

//Get Spot details from id
router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  if (spot === null) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }

  res.json(spot);
});

//Add image to spot from spotId
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;

  const thisSpot = await Spot.findByPk(spotId);

  if (thisSpot === null) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  if (thisSpot.ownerId !== req.user.dataValues.id) {
    return res.status(403).json({
      message: "Image can only be added by Spot Owner",
    });
  }

  const newSpotImage = await SpotImage.create({
    spotId,
    url,
    preview: preview ? true : false,
  });
  return res.json({
    id: spotId,
    url: newSpotImage.url,
    preview: newSpotImage.preview,
  });
});

//Edit a spot
router.put("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spot = await Spot.findByPk(spotId);

  if (spot === null) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  };

  if (spot.ownerId !== req.user.dataValues.id) {
    return res.status(403).json({
      message: "Spot can only be edited by Owner",
    });
  };

  let errors = {};

  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Country is required";
  if (!lat || typeof lat !== "number" || lat <= -150 || lat >= 150) errors.lat = "Latitude is not valid";
  if (!lng || typeof lng !== "number" || lng <= -150 || lng >= 150) errors.lng = "Longitude is not valid";
  if (!name || name.length > 50)
    errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (!price) errors.price = "Price per day is required";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  }

  await Spot.update(
    {
      ...req.body,
    },
    {
      where: {
        id: spotId,
      },
    }
  );

  const newSpot = await Spot.findByPk(spotId);

  return res.json(newSpot);
});

router.delete("/:spotId", requireAuth, async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    if (spot === null) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    };

    if (spot.ownerId !== req.user.dataValues.id) {
        return res.status(403).json({
          message: "Spot can only be deleted by Owner",
        });
      };

    await Spot.destroy({
        where: {
            id: spot.dataValues.id
        }
    })

    return res.json({
        message: "Successfully deleted"
    })
});

//Create review for Spot based on Spot Id
router.post('/:spotId/reviews', requireAuth, async(req, res) => {
  const {spotId} = req.params
  const {review, stars} = req.body;
  const userId = req.user.id

  const spot = await Spot.findByPk(spotId);

  if (spot === null) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  };

  const errors = {};

  if (!review.length) {
    errors.review = "Review text is required"
  };

  if ( stars === null || stars < 1 || stars > 5 || typeof stars !== 'number') {
    errors.stars = "Stars must be an integer from 1 to 5"
  };

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: errors,
    });
  };

  const existingReview = await Review.findOne({
    where: {
      userId: userId,
      spotId: spotId
    }
  });

  if (existingReview) {
    return res.status(500).json({
      message: "User already has a review for this spot"
    })
  };

  const newReview = await Review.create({
    userId,
    spotId,
    review,
    stars
  })

  res.status(201).json(newReview)
})

module.exports = router;