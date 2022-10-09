const mongoose = require("mongoose");
const _ = require('lodash');
const models = require("../schemas/article.js")(mongoose);
let model = models.Article;


function modelQuery() {
  let titles = [];
  let locations = [];
  let tags = [];
  let descriptionsRaw = [];
  let pictures = [];
  let descriptions = [];
  let articles = [];
  let dates = [];
  let ids = [];
  return new Promise((resolve, reject) => {
    model.find((err, items) => {
      if (err) {
        reject(err);
      } else {
        items.forEach((blog)=>{
          titles.unshift(blog.title),
          descriptionsRaw.unshift(blog.description),
          pictures.unshift(blog.thumbnail),
          tags.unshift(blog.tag),
          dates.unshift(blog.date),
          articles.unshift(blog.article),
          locations.unshift(blog.location),
          ids.unshift(blog._id)

        });
        descriptions = descriptionsRaw.map(x => _.truncate(x, {
          "length": 300,
          "omission": "..."
        }));
        let fullArray = {
          pictures: pictures,
          titles: titles,
          tags: tags,
          description: descriptions,
          article: articles,
          dates: dates,
          locations: locations,
          ids: ids
        }
        resolve(fullArray);
      }
    });
  });
}
async function searchAll(){
  try{
  const search =modelQuery()
return search.then((results)=>{
  return results})
}
  catch(err){
    console.log(err);
  }
}


function modelQuery2(id) {
  let titles = [];
  let locations = [];
  let tags = [];
  let descriptionsRaw = [];
  let pictures = [];
  let descriptions = [];
  let articles = [];
  let dates = [];
  let ids = [];
  return new Promise((resolve, reject) => {
    model.findById(id,function(err, item) {
      if (err) {
        reject(err);
      } else {
          titles.unshift(item.title),
          descriptionsRaw.unshift(item.description),
          pictures.unshift(item.thumbnail),
          tags.unshift(item.tag),
          dates.unshift(item.date),
          articles.unshift(item.article),
          locations.unshift(item.location),
          ids.unshift(item._id)


        descriptions = descriptionsRaw.map(x => _.truncate(x, {
          "length": 300,
          "omission": "..."
        }));
        let fullArray = {
          pictures: pictures,
          titles: titles,
          tags: tags,
          description: descriptions,
          article: articles,
          dates: dates,
          locations: locations,
          ids: ids
        }
        resolve(fullArray);
      }
    });
  });
}
async function searchArticleById(id){
  try{
  const search =modelQuery2(id)
return search.then((results)=>{
  return results})
}
  catch(err){
    console.log(err);

  }
}


  module.exports = {
    modelQuery,
    searchAll,
    modelQuery2,
    searchArticleById
  };
