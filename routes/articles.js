const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");
const find = require("../config/functions/find.js");


router
router.route("/:id")
.get((req,res)=>{
console.log(req.id);
res.render("article",{
  id:req.id
});
})




module.exports = router;
