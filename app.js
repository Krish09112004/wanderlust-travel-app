if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
 
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

// Security headers for production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
  });
}

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret: process.env.SECRET,

  },
  touchAfter: 24*3600,
    
});

store.on("error",()=>{
  console.log("Error in Mongo Session Store",err);
});

const sessionOptions = {
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly: true,
  },
};



main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error   = req.flash("error");
  res.locals.currUser = req.user;
  next();
})

app.get("/",(req,res)=>{
  res.redirect("/listings")
})

// Debug route for production troubleshooting
app.get("/debug", async (req,res)=>{
  try {
    const Listing = require("./models/listing.js");
    const totalCount = await Listing.countDocuments({});
    const sampleListings = await Listing.find({}).limit(3);
    
    res.json({
      success: true,
      database_url: process.env.ATLASDB_URL ? "Set" : "Not Set",
      node_env: process.env.NODE_ENV || "not set",
      total_listings: totalCount,
      sample_listings: sampleListings.map(listing => ({
        id: listing._id,
        title: listing.title,
        location: listing.location,
        price: listing.price,
        has_image: !!listing.image?.url,
        has_owner: !!listing.owner
      }))
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
      database_url: process.env.ATLASDB_URL ? "Set" : "Not Set",
      node_env: process.env.NODE_ENV || "not set"
    });
  }
})

app.use("/listings",listingRoutes);
app.use("/listings/:id/reviews",reviewRoutes);
app.use("/",userRoutes);
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page not found"));
})



app.use((err,req,res,next)=>{ 

  let{status = 500, message = "Something went wrong"} = err;
  res.status(status).render("error.ejs",{message});
})



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
