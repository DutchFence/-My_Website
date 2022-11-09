module.exports = function(mongoose){

  let contactSchema = new mongoose.Schema({
    email: {type: String,
            required:[true, "An email is required"],
          },
    subject: {type: String,
            required:[true, "A subject is required"],
          },
    message: {type: String,
            required:[true, "A message is required"],
          }
         });


  var models={
    contactForm: mongoose.model("Questions", contactSchema)
  }
  return models;
}
