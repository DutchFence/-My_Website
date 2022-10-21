const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");




  let moderatorSchema = new mongoose.Schema({
    username: {
      type: String,
      required: [true, "You must provide a username"],
      unique: [true, "this username is already in use"]
    },
    FirstName: {
      type: String,
      required: [true, "Provide your first name"]
    },
    LastName: {
      type:String,
      required: [true, "Provide your last name"]
    },
    email: {
      type:String,
      required:[true,"Please provide a valid email"],
      unique: [true, "This email is already in use"]
    },
  });
  moderatorSchema.plugin(passportLocalMongoose);
  const moderatorModel = new mongoose.model("Mods", moderatorSchema);

  module.exports = moderatorModel;
