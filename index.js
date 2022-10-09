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




app.listen(3000, ()=>{
  console.log("server 3000 online");
})
const homeRouter = require("./routes/home.js");
const uploadRouter = require("./routes/upload.js");
const articleRouter = require("./routes/articles.js");
app.use("/",  homeRouter);
app.use("/upload", uploadRouter);
app.use("/article", articleRouter);
