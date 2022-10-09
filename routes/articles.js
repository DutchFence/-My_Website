const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");
const find = require("../config/functions/find.js");
let loadArticle;

router
router.route("/:id")
.get((req,res)=>{

let id= req.params.id;
  console.log(req.params)
  loadArticle=find.searchArticleById(id);
loadArticle.then(function(results){


res.render("article",{
  title:results.titles[0],
  article: results.article[0],
  date: results.dates[0],
  location: results.locations[0],
  tag:results.tags[0]
});
})
});



module.exports = router;
