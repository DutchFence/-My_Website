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
  description: String,
  thumbnail: {type:String, default: "https://images0.persgroep.net/rcs/fQHfEbeRmmxMtdsOCz3LO4IfYqE/diocontent/112687658/_crop/0/0/1580/893/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8&desiredformat=webp"},
  article: String,
  views: {type:Number, default: 0},
  comments: [commentSchema]
});
const titles=[
]
const descriptionsRaw=[]
const pictures =[];
let descriptions =[];
const articles =[];
const Article = mongoose.model("Article", articleSchema);

 Article.find((err, blogPosts)=>{
  if (err){
    console.log(err);
  } else {

 blogPosts.forEach((blog)=>{
console.log(blog.title + "blogggs");
   titles.unshift(blog.title),
   descriptionsRaw.unshift(blog.description),
   pictures.unshift(blog.thumbnail),
   articles.unshift(blog.article)
   console.log(descriptionsRaw);
 });
descriptions = descriptionsRaw.map(x => _.truncate(x, {
   "length": 300,
   "omission": "..."
 }));

  }
});
console.log("uit de loop" + descriptions);


const blogPosts = ''

app.get("/", (req,res)=>{
  res.render("index", {
  pictures: pictures,
  titles: titles,
  description: descriptions,
  article: articles

  });
})

app.get("/upload", (req,res) =>{
  res.render("upload");

})

app.post("/upload", (req, res)=>{
  const title = req.body.Title;
  const description = req.body.Description;
  const article = req.body.Article;
  const thumbnail = req.body.Thumbnail;
  console.log(title, description, article);
  const newPost = new Article({
    title: title,
    description: description,
    article: article,
    thumbnail: thumbnail
  });
  newPost.save();
  console.log("saved sucesfully!");
  res.redirect("/");
});
app.listen(3000, ()=>{
  console.log("server 3000 online");
})
