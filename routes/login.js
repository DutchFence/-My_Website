const express = require("express");
const router = express.Router();
const modSchema = require("../config/schemas/moderator.js");
const passport = require("passport");
const dotenv = require('dotenv');
dotenv.config();
const uploadCode = process.env.UPLOAD;
const login = process.env.LOGIN;

passport.use(modSchema.createStrategy());
passport.serializeUser(modSchema.serializeUser());
passport.deserializeUser(modSchema.deserializeUser());


router.route("/")
.get((req,res)=>{

  res.render("login",
{login: login});
})
.post((req,res)=>{
const user = new modSchema({
  username: req.body.username,
  password: req.body.password
});

req.login(user, function(err){
  console.log(user);
  if(err){
    console.log(err);
    console.log("req.login failed")
    res.redirect("/");

  }else{
    passport.authenticate("local")(req,res,function(){
      console.log("req.login succes with: "+ req.user);
          res.redirect("/"+uploadCode);
    });

  }
});

// modSchema.register({username:req.body.username, email:req.body.username, FirstName:"Thomas", LastName:"Heck"}, req.body.password, function(err, user){
//
//   if(err){
//     console.log(err);
//   }else{
//     passport.authenticate("local")(req,res, function(){
//       console.log("succes");
//     });
//   }
// });
});


// .post('/login', passport.authenticate('local', {
//   successRedirect: '/upload',
//   failureRedirect: '/home'
// }));
module.exports = router;
