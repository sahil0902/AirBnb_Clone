const Listing  = require("./models/listing")
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review");

/**
 * Middleware module for handling schemas.
 * @module middleware
 */

const { listingSchema,reviewSchema } = require("./schema");

/**
 * isLoggedIn middleware function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @description This middleware function checks if the user is authenticated or not. 
 * If not, it sets the redirectUrl to the original URL and flashes an error message before redirecting to the login page. 
 * If the user is authenticated, it moves on to the next middleware function in the stack.
 */
module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user);
  console.log(req.path);
  if (!req.isAuthenticated()) {
    // so we can redirect him to the same URL
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Please Login");
    return res.redirect("/login");
  }
  next();
};

/**
 * savedRedirectUrl middleware function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @description This middleware function checks if the redirectUrl is set in the session. 
 * If it is, it sets the res.locals.redirectUrl to the redirectUrl and moves on to the next middleware function in the stack.
 */
module.exports.savedRedirectUrl = (req, res, next) => {
  if (req.session && req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
  } else {
    res.locals.redirectUrl = '/listings'; // Replace with your default redirect URL
  }
  next();
}

/**
 * isOwner middleware function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @description This middleware function checks if the user is the owner of the listing. 
 * If not, it flashes an error message and redirects to the listing page.
 */
module.exports.isOwner = async (req,res,next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
   
  if (!listing.owner._id.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to edit this listing');
    return res.redirect(`/listings/${id}`);
  }
  next();
};

/**
 * validateListing middleware function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @description This middleware function validates the listing data against the listingSchema. 
 * If there is an error, it throws an ExpressError with a 400 status code and the error message. 
 * If there is no error, it moves on to the next middleware function in the stack.
 */
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

/**
 * validateReview middleware function
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @description This middleware function validates the review data against the reviewSchema. 
 * If there is an error, it throws an ExpressError with a 400 status code and the error message. 
 * If there is no error, it moves on to the next middleware function in the stack.
 */
module.exports.validateReview = (req, res, next) => {
  let { id, reviewId } = req.params;
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let msg = error.details.map((el) => el.message).join(",");
    msg = msg.replace(/[".]/g, " ");
    req.flash("error", msg);
    // Redirect back to product page with flash message
    return res.redirect(`/listings/${id}`);
  } else {
    next();
  }
};


module.exports.isAuthor = async (req,res,next) => {
  let { id, reviewId } = req.params;
  let listing = await Review.findById(reviewId);
   
  if (!review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to perform this action');
    return res.redirect(`/listings/${id}`);
  }
  next();
};
