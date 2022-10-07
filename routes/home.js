const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");
const models = require("./article")(mongoose);

let titles=[];
let locations =[];
let tags=[];
let descriptionsRaw=[];
let pictures =[];
let descriptions =[];
let articles =[];
let dates =[];
let Article =  models.Article;

Article.find((err, items)=>{
 if (err){
   console.log(err);
 } else {

items.forEach((blog)=>{
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

}


});


router.get("/", (req,res)=>{

  res.render("index", {
  pictures: pictures,
  titles: titles,
  tags: tags,
  description: descriptions,
  article: articles,
  dates: dates,
  locations: locations
  });
})


module.exports = router;
