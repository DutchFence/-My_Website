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
let titles=[];
 let locations =[];
 let tags=[];
 let descriptionsRaw=[];
 let pictures =[];
let descriptions =[];
let articles =[];
let dates =[];
let Article = mongoose.model("Article", articleSchema);

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

  }
});



const blogPosts = ''

app.get("/", (req,res)=>{
  console.log(fullDataObject);
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
