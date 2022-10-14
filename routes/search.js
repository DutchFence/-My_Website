const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");
const find = require("../config/functions/find.js");
let loadArticle;

router
router.route("/byTag/:tag")
.get((req,res)=>{

  let tag= req.params.tag;
console.log(req.params);

   loadArticle =find.searchArticle(tag, "tag");
  loadArticle.then(function(results){
    console.log("results = "+ results);
    res.render("resultsPage", {
    searchQuery: tag,
    pictures: results.pictures,
    titles: results.titles,
    tags: results.tags,
    description: results.description,
    article: results.articles,
    dates: results.dates,
    ids: results.ids
    });
  }).catch((err)=>{
console.log(err);})

});



module.exports = router;
