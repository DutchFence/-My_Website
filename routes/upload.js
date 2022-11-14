const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");
const modSchema = require("../config/schemas/moderator.js");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const dotenv = require('dotenv');

const find = require("../config/functions/find.js");
const newPostModel = require('../config/schemas/newPost.js')(mongoose);
let newPost = newPostModel.newPost;

const moderatorModel = require('../config/schemas/moderator.js');
const modModel = moderatorModel.Moderator;


dotenv.config();

const uploadCode = process.env.UPLOAD;
const login = process.env.LOGIN;
let loadData;

router
.route("/")
.get((req,res)=>{
console.log("req.isauthenticated: "+req.isAuthenticated());
console.log("req.user at uploadrouter: "+ req.user);
if(req.isAuthenticated()){

  console.log("authentication succes");
  res.render("modHome",{
    uploadCode: uploadCode
  });
}else{
  console.log("authentication fail");
res.redirect("/"+login);
}


});
router
.route("/upload")
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
      });
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

    router
    .route("/edit")
    .get((req,res)=>{
      if(req.isAuthenticated()){
              console.log("authentication succes");
        loadData =find.searchArticle();
        loadData.then(function(results){

          res.render("edit", {
          uploadCode:uploadCode,
          results: results
          });
        }).catch((err)=>{
      console.log(err);})


    }else{
      console.log("authentication fail");
    res.redirect("/"+login);
    }
    });

    router
    .route("/edit/:id")
    .get((req,res)=>{

      let id= req.params.id;
        console.log(req.params)
        loadArticle=find.searchArticle(id, "id");
        loadArticle.then(function(results){

      res.render("editingMode",{
        uploadCode: uploadCode,
        title:results.titles[0],
        article: results.article,
        date: results.dates[0],
        tag:results.tags[0],
        id: results.ids[0],
        picture:results.pictures[0]
      });
      })
    })
    .post((req,res)=>{
      let id = req.params.id;
      const time = new Date();
      const date = time.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month:"long",
        year: "numeric"
      });
      console.log(id);
      let newArticle = req.body.preview;
      find.updateOneArticle(id,newArticle, date);


      res.redirect("/"+uploadCode);
    })

    router
    .route("/inbox")
    .get((req,res)=>{
    let inbox =  find.showInbox();
    inbox.then((results)=>{
      console.log(results[2].email);
      res.render("inbox",
    {inbox: results,
    uploadCode:uploadCode}
  );
    })


    });
module.exports = router;
