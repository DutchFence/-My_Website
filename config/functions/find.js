const mongoose = require("mongoose");
const _ = require('lodash');
const models = require("../schemas/article.js")(mongoose);
let model = models.Article;


function queryAll() {
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



function queryById(id) {
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
async function searchArticle(id){
switch(typeof id){
  case "undefined":
  try{
    console.log("in default");
  const search =queryAll()
  return search.then((results)=>{
    return results})
      }
      catch(err){
  console.log(err);
  }
break;

default:
try{
const search =queryById(id)
return search.then((results)=>{
  return results})
    }
    catch(err){
console.log(err);
}
break;
}




}


  module.exports = {
    queryAll,
    queryById,
    searchArticle
  };
