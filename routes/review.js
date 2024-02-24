const express = require("express");
////to pass id from one parent to child route we use merge params
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require("../schema.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

const { isLoggedIn, validateReview,isAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
////review route ->post
router.post(
  "/",
  isLoggedIn,
  validateReview,
   wrapAsync(reviewController.createReview)
);
///delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
