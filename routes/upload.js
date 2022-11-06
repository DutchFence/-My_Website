const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");
const modSchema = require("../config/schemas/moderator.js");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const newPostModel = require('../config/schemas/newPost.js')(mongoose);
let newPost = newPostModel.newPost;
const dotenv = require('dotenv');
// passport.use(modSchema.createStrategy());
// passport.serializeUser(modSchema.serializeUser());
// passport.deserializeUser(modSchema.deserializeUser());
const moderatorModel = require('../config/schemas/moderator.js');
const modModel = moderatorModel.Moderator;
dotenv.config();
const uploadCode = process.env.UPLOAD;
const login = process.env.LOGIN;

router
.route("/")
.get((req,res)=>{
console.log("req.isauthenticated: "+req.isAuthenticated());
console.log("req.user at uploadrouter: "+ req.user);
if(req.isAuthenticated()){

  console.log("authentication succes");
  res.render("upload",{
    uploadCode: uploadCode
  });
}else{
  console.log("authentication fail");
res.redirect("/"+login);
}


})
.post((req,res)=>{


    const time = new Date();
    const date = time.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month:"long",
      year: "numeric"
    })
    const title = req.body.Title;
    const description = req.body.Description;
    const article = req.body.preview;

    const thumbnail = req.body.Thumbnail;
    const tag = req.body.Tag;

  let post = new newPost({
      title: title,
      tag: tag,
      description: description,
      article: article,
      thumbnail: thumbnail,
      date: date
    });

    post.save(function(err, newArt){
      if(err){
        console.log(err);
      }else{
        console.log("updated: "+ newArt);
      }
    });

    console.log("saved sucesfully!");
    res.redirect("/");
  });


module.exports = router;
