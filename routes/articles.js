const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");
const find = require("../config/functions/find.js");
const sanitizeHTML = require("sanitize-html");
let loadArticle;
let cleanArticle;
let cleanOptions= {
  allowedTags: [
  "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
  "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
  "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre",
  "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
  "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc",  "s", "samp",
  "small", "span", "strong", "sub", "sup", "time", "u", "wbr", "caption",
  "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr, img"
],
disallowedTagsMode: 'discard',
allowedAttributes: {
  a: [ 'href', 'name', 'target' ],
  // We don't currently allow img itself by default, but
  // these attributes would make sense if we did.
  img: [ 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading' ]
},
// Lots of these won't come up by default because we don't allow them
selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
// URL schemes we permit
allowedSchemes: [ 'http', 'https', 'ftp', 'mailto', 'tel' ],
allowedSchemesByTag: {},
allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
allowProtocolRelative: true,
enforceHtmlBoundary: false};

router
router.route("/:id")
.get((req,res)=>{

let id= req.params.id;
  console.log(req.params)
  loadArticle=find.searchArticle(id, "id");
  loadArticle.then(function(results){
cleanArticle= sanitizeHTML(results.article[0], cleanOptions)

res.render("article",{
  title:results.titles[0],
  article: cleanArticle,
  date: results.dates[0],
  tag:results.tags[0],
  picture:results.pictures[0]
});
})
});



module.exports = router;
