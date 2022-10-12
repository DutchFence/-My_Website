const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");
const models = require('../config/schemas/newPost.js')(mongoose);
let newPost = models.newPost;

router
.route("/")
.get((req,res)=>{
    res.render("upload");

}
)
.post((req,res)=>{


    const time = new Date();
    const date = time.toLocaleDateString("nl-NL", {
      weekday: "long",
      day: "numeric",
      month:"long",
      year: "numeric"
    })
    const title = req.body.Title;
    const description = req.body.Description;
    const article = req.body.preview;
    console.log("artc"+typeof article);
    const thumbnail = req.body.Thumbnail;
    const tag = req.body.Tag;
    const location = req.body.Location

  let post = new newPost({
      title: title,
      tag: tag,
      description: description,
      article: article,
      thumbnail: thumbnail,
      date: date,
      location: location
    });

    post.save(function(err, newArt){
      if(err){
        console.log(err);
      }else{
        // console.log("updated: "+ newArt);
      }
    });

    console.log("saved sucesfully!");
    res.redirect("/");
  });


module.exports = router;
