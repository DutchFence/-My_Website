const express = require("express");
const _ = require('lodash');
const ejs = require("ejs");
const app = express();
const bodyparser= require("body-parser");
const mongoose=require("mongoose");
const homeRouter = require("./routes/home.js");
const uploadRouter = require("./routes/upload.js");
const articleRouter = require("./routes/articles.js");
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
const ok= "upload";
const uploadCode = process.env.UPLOAD;
const port = process.env.PORT


mongoose.connect("mongodb://localhost:27017/blogPosts");
app.use("/",  homeRouter);
app.use("/"+ uploadCode, uploadRouter);
app.use("/article", articleRouter);




app.listen(3000, ()=>{
  console.log("server 3000 online");
})
