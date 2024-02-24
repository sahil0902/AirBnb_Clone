const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//create Route

module.exports.createReview = async (req, res) => {
  try {
      console.log(req.params.id);
      let listing = await Listing.findById(req.params.id);
      let newReview = new Review(req.body.review);
      newReview.author = req.user._id; //set the user id as author of this review
      console.log(newReview);
      listing.reviews.push(newReview);
      await newReview.save().catch((e) => {
          req.flash("error", e.message);
          return res.redirect(`/listings/${req.params.id}`);
      });
      await listing.save().catch((e) => {
          req.flash("error", e.message);
          return res.redirect(`/listings/${req.params.id}`);
      });
      req.flash("success", "Your review has been added!");
      console.log("new rev saved");
      return res.redirect(`/listings/${req.params.id}`);
  } catch (e) {
      req.flash("error", e.message);
      return res.redirect(`/listings/${req.params.id}`);
  }
};
  //delete route
  module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    console.log(req.params);
    // pull operator removed all the matching vaues
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId)
      .then(() => {
        console.log(reviewId);
        req.flash("success", "Successfully deleted review!");
        return res.redirect(`/listings/${id}`);
      })
      .catch(() => {
        req.flash("error", "Something went wrong deleting your review");
        return res.redirect(`/listings/${id}`);
      });
    };