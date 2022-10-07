const express = require("express");
const _ = require('lodash');
const ejs = require("ejs");
const app = express();
const bodyparser= require("body-parser");
const mongoose=require("mongoose");

app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost:27017/blogPosts");





app.get("/upload", (req,res) =>{
  res.render("upload");

})

app.post("/upload", (req, res)=>{

  const time = new Date();
  const date = time.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month:"long",
    year: "numeric"
  })
  const title = req.body.Title;
  const description = req.body.Description;
  const article = req.body.Article;
  const thumbnail = req.body.Thumbnail;
  const tag = req.body.Tag;
  const location = req.body.Location

  const newPost = new Article({
    title: title,
    tag: tag,
    description: description,
    article: article,
    thumbnail: thumbnail,
    date: date,
    location: location
  });
  newPost.save();
  console.log("saved sucesfully!");
  res.redirect("/");
});
app.listen(3000, ()=>{
  console.log("server 3000 online");
})
const homeRouter = require("./routes/home.js");

app.use("/", updater, homeRouter);


function updater(req, res, next){

  next();
}
