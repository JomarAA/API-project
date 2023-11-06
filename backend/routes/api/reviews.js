const express = require("express");
const { Op, NUMBER } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Spot, User, SpotImage, Review, ReviewImage } = require("../../db/models");
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
            userId: user.id
        },
        include: [
            {
             model: User,
             attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    for (let review of reviews) {
        previewImage = await SpotImage.findOne({
          where: {
            spotId: review.Spot.dataValues.id,
            preview: true,
          },
          attributes: ["url"],
        });

        if (previewImage) {
          review.Spot.dataValues.previewImage = previewImage.dataValues.url;
        }
      }

    res.json({Reviews: reviews})
});

//Add image to Review from ReviewId
router.post('/:reviewId/images', requireAuth, async(req, res) => {
    const {reviewId} = req.params;
    const {url} = req.body;

    const review = await Review.findByPk(reviewId, {
        include: ReviewImage
    });

    if (review === null) {
        return res.status(404).json({
          message: "Review couldn't be found",
        });
      };

    if (review.userId !== req.user.dataValues.id) {
       return res.status(403).json({
         message: "Review must belong to current user",
    });
      };
      if (review.ReviewImages.length >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
      }
    const newReviewImage = await ReviewImage.create({
        url,
        reviewId: parseInt(reviewId)
    })
    return res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
});

//Delete a review
router.delete('/:reviewId', requireAuth, async(req, res) => {
    const {reviewId} = req.params;

    const review = await Review.findByPk(reviewId);

    if (review === null) {
        return res.status(404).json({
          message: "Review couldn't be found",
        });
      };

    if (review.userId !== req.user.dataValues.id) {
       return res.status(403).json({
         message: "Review must belong to current user",
        });
    };

    await Review.destroy({
        where:{
            id: review.dataValues.id
        }
    });

    return res.json({
        message: 'Successfully deleted'
    });
});

//Edit a review
router.put('/:reviewId', requireAuth, async(req, res) => {
    const {reviewId} = req.params;
    const {review, stars} = req.body;

    const thisReview = await Review.findOne({
      where: {
        id: reviewId
      }
     })

    if (thisReview === null) {
        return res.status(404).json({
          message: "Review couldn't be found",
        });
      };

      if (thisReview.userId !== req.user.dataValues.id) {
        return res.status(403).json({
          message: "Review can only be edited by Owner",
        });
      };

    let errors = {};
    if (!review) errors.review = "Review text is required";
    if (!stars || stars < 1 || stars > 5 || typeof stars !== 'number') errors.stars = "Stars must be an integer from 1 to 5";

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
          message: "Bad Request",
          errors: errors,
        });
      };

    await thisReview.update(
        {
            ...req.body
        },
        {
            where: {
                id: reviewId
            }
        }
    );
    const newReview = await Review.findByPk(reviewId);

    res.json(newReview)
})



module.exports = router;
