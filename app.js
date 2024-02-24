if(process.env.NODE_ENV !=  'production') {
  require('dotenv').config();
}

console.log(process.env.secret);

const express = require("express");
const mongoose = require("mongoose");
//session
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const ExpressError = require("./utils/ExpressError.js");
app.locals.layout = "layout";

////routes
const listingsRoute = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
///passport local for authentication7
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js")


//--------------------------- -------------------------------
let port = 8080;

const dbUrl = process.env.ATLASDB_URL
async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err}`);
  });
app.listen(port, () => {
  console.log(`live at ${port}`);
});
//It will store session info in database
const store = MongoStore.create({
  mongoUrl: dbUrl,
  cryoto : {
    secret : SECRET
  },
  touchAfter : 24 * 3600
});
store.on("error", (e) => {console.log(" store error", e)});
///setting up secret
const sessionOptions = {
  store,
  secret: env.process.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // one week in milliseconds
    maxAge: 7 * 24 * 60 * 60 * 1000, // one week in milliseconds
    httpOnly: true,
  },
};



app.get("/", (req, res) => {
  res.redirect("/listings");
});
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
// We use passport.serializeUser() and passport.deserializeUser() functions to enable session support for authentication. 
//These functions are responsible for serializing and deserializing the user object to and from the session. 
//This allows us to store the user information in the session and retrieve it when needed for authentication purposes.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  console.log(res.locals.success);
  next();
});

// app.get("/demouser",async (req,res)=>{
//   let fakeUser = new User({
//     email : "sahil@gmail.com",
//     username : "ss",
//     password : "sahil"
//   });
// let regUSer = await  user.register(fakeUser,"sahil");
// res.send(regUSer);
// });

app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/",userRoute);

app.all("*", function (req, res, next) {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
  let { message, statusCode } = err;
  res.render("error.ejs", { err });
});
