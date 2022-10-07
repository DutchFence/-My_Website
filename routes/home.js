const express = require("express");
const mongoose = require("mongoose");
const _ = require('lodash');
const router = express.Router();

const commentSchema = new mongoose.Schema({
  commentator : String,
  comment : String,
  email : {type:String, default:"not given"}
});

const articleSchema = new mongoose.Schema({
  title: String,
  tag: String,
  description: String,
  thumbnail: {type:String, default: "https://images0.persgroep.net/rcs/fQHfEbeRmmxMtdsOCz3LO4IfYqE/diocontent/112687658/_crop/0/0/1580/893/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8&desiredformat=webp"},
  article: String,
  date: String,
  views: {type:Number, default: 0},
  comments: [commentSchema],
  location: {type: String, default: ""}
});
let Article = mongoose.model("Article", articleSchema);

  let titles=[];
   let locations =[];
   let tags=[];
   let descriptionsRaw=[];
   let pictures =[];
  let descriptions =[];
  let articles =[];
  let dates =[];


   Article.find((err, blogPosts)=>{
    if (err){
      console.log(err);
    } else {
  //SECURITY We dont use the object as it can be a security threat when unauthorized people enter scripts in the data SECURITY
   blogPosts.forEach((blog)=>{
     titles.unshift(blog.title),
     descriptionsRaw.unshift(blog.description),
     pictures.unshift(blog.thumbnail),
     tags.unshift(blog.tag),
     dates.unshift(blog.date),
     articles.unshift(blog.article),
     locations.unshift(blog.location)

   });

  descriptions = descriptionsRaw.map(x => _.truncate(x, {
     "length": 300,
     "omission": "..."
   }));
 return[pictures, titles, tags, descriptions, locations, articles,dates];
    }
  });


router.get("/hoi", (req,res)=>{
  console.log("nu wel he");
  res.render("index", {
  pictures: pictures,
  titles: titles,
  tags: tags,
  description: descriptions,
  article: articles,
  dates:dates,
  locations: locations

  });
})


module.exports = router;
