const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");
const find = require("./find.js")
let ape;

router
router.route("/:id")
.get((req,res)=>{
console.log(req.id);
res.render("article",{
  id:req.id
});
})
router.param("id",(req,res,next,id)=>{

  find.modelQuery().then((pictures)=>{
    console.log(pictures);
  }).catch(()=>{
    console.log("fail");
  })
  next();
})



module.exports = router;
