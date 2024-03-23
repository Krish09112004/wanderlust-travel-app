const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedin, isOwner,validateListing} = require("../middleware.js");
const ListingController = require("../controller/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage  });

  
  //Index Route
  router.route("/")
  .get( wrapAsync(ListingController.index))
  .post(isLoggedin ,upload.single('listing[image]') , wrapAsync( ListingController.createListing)
  ); 
  
  //New Route
  router.get("/new",isLoggedin , ListingController.renderNewForm);
  

  router.route("/:id")
  .get( wrapAsync(ListingController.showListing))
  .put(isLoggedin,isOwner ,upload.single('listing[image]') ,validateListing,wrapAsync(ListingController.updateListing))
  .delete(isLoggedin,isOwner ,wrapAsync( ListingController.destroyListing));
  
  
  //Edit Route
  router.get("/:id/edit", isLoggedin,isOwner,wrapAsync(ListingController.renderEditForm));
  
module.exports = router;