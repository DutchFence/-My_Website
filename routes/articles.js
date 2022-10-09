const express = require("express");
const _ = require('lodash');
const router = express.Router();
const mongoose=require("mongoose");

router
router.route("/:id")
.get((req,res)=>{
console.log(req.id);
res.render("article",{
  id:req.id
});
})
router.param("id",(req,res,next,id)=>{

  next();
})



module.exports = router;
