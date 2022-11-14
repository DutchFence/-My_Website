
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const router = express.Router();
const find = require("../config/functions/find.js");

router
router.route("/")
.get((req,res)=>{
  res.render("contact");
})
.post((req,res)=>{
  let email = req.body.email;
  let subject = req.body.contactSubject;
  let message = req.body.contactTextArea;

  find.saveContact(email, subject, message);
       res.redirect("/");
// let Question = new contactForm({
//   email: email,
//   subject: subject,
//   message: message
// });
// Question.save(function(err, newQuestion){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Recieved a new "+newQuestion.subject +"from "+ newQuestion.email);
//     res.redirect("/");
//   }
// });
})

module.exports = router;
