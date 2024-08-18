const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })
const Listing = require("../models/listing.js");

/**
 * This file contains the routes for handling listings.
 * It imports middleware functions for authentication, ownership validation, and listing validation.
 */
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

router.route("/").get(wrapAsync(listingController.index))
.post(
  //first validate the listing
  isLoggedIn,
  upload.array('Listing[image]'),
  validateListing,
  wrapAsync(listingController.CreateListing)
);
///search route
router.get("/search", wrapAsync(listingController.searchListing));
//filter rote 
router.get("/filter-listings", wrapAsync(listingController.filterListings));

///new route
router.get("/new", isLoggedIn, listingController.Add);

router
  .route("/:id")
  .get( wrapAsync(listingController.ShowAll))
  .put(
    isLoggedIn,
    isOwner,
    upload.array('Listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, wrapAsync(listingController.deleteListing));

// Edit route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editListing));

module.exports = router;
