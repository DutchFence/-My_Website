const mongoose = require("mongoose");
const _ = require('lodash');
const models = require("../schemas/article.js")(mongoose);
let model = models.Article;


function queryAll() {
  let titles = [];
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
          ids.unshift(blog._id)

        });
        descriptions = descriptionsRaw.map(x => _.truncate(x, {
          "length": 200,
          "omission": "..."
        }));
        let fullArray = {
          pictures: pictures,
          titles: titles,
          tags: tags,
          description: descriptions,
          article: articles,
          dates: dates,
          ids: ids
        }
        resolve(fullArray);
      }
    });
  });
}


function queryByTag(id) {
  console.log("gegeven tag ="+id);
  let titles = [];
  let tags = [];
  let descriptionsRaw = [];
  let pictures = [];
  let descriptions = [];
  let articles = [];
  let dates = [];
  let ids = [];
  return new Promise((resolve, reject) => {
    model.find({tag: id},function(err, item) {
      if (err) {
        reject(err);
      } else {
console.log(item);
item.forEach((blog)=>{
          titles.unshift(blog.title),
          descriptionsRaw.unshift(blog.description),
          pictures.unshift(blog.thumbnail),
          tags.unshift(blog.tag),
          dates.unshift(blog.date),
          articles.unshift(blog.article),
          ids.unshift(blog._id)
})

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
          ids: ids
        }

        resolve(fullArray);
      }
    });
  });
}
function queryById(id) {
  let titles = [];
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
          ids: ids
        }
        resolve(fullArray);
      }
    });
  });
}
async function searchArticle(id, category){
switch(category){
  case "id":
  try{
  const search =queryById(id)
  return search.then((results)=>{
    return results})
      }
      catch(err){
  console.log(err);
  }
break;

case "tag":
try{
  console.log("tagname is " + id);
const search =queryByTag(id)
return search.then((results)=>{
  return results})
    }
    catch(err){
console.log(err);
}
break;

default:
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
}




}


  module.exports = {
    queryAll,
    queryById,
    queryByTag,
    searchArticle
  };
