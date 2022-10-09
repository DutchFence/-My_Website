const mongoose = require("mongoose");
const _ = require('lodash');
const models = require("../schemas/article.js")(mongoose);
let model = models.Article;
let titles = [];
let locations = [];
let tags = [];
let descriptionsRaw = [];
let pictures = [];
let descriptions = [];
let articles = [];
let dates = [];
let ids = [];

function modelQuery() {
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

  module.exports = {
    modelQuery,
    searchAll
  };
