const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validatereview,isLoggedin,isAuthor} = require("../middleware.js");
const ReviewController = require("../controller/reviews.js");


//post Reviews route
router.post("/",validatereview,isLoggedin, ReviewController.createReview);
  
//delete Reviews route
router.delete("/:reviewId",isLoggedin,isAuthor,wrapAsync(ReviewController.destroyReview));

module.exports = router;