const User = require("../models/user.js");

//sign up route
module.exports.SignUp = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      await User.register(newUser, password);
      console.log(newUser);
      req.login(newUser,(err) =>{
        if(err){
         return next(err);
        }
        req.flash("success", "Welcome to Wanderlust!");
        res.redirect("/listings");
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  };

//shows login page

module.exports.showLogIn = (req, res) => {
    res.render("users/login.ejs");
}

//logic for sign in  
module.exports.LogIn = async (req, res) => {
    req.flash("success", `Welcome back ${req.user.username}!`);
   res.redirect(res.locals.redirectUrl);
   console.log("URL\t"+res.locals.redirectUrl);
  
  };

//logout page
module.exports.logOut = function(req, res,next){
    req.logout(err =>{
      if(err){
        next(err);
      }
      req.flash("success","Logged you out!");
      res.redirect("/listings");
    });
    
    
    };