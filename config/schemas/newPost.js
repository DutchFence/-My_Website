module.exports = function(mongoose){


  let newPostSchema = new mongoose.Schema({
    title: String,
    tag: String,
    description: String,
    thumbnail: {type:String, default: "https://images0.persgroep.net/rcs/fQHfEbeRmmxMtdsOCz3LO4IfYqE/diocontent/112687658/_crop/0/0/1580/893/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8&desiredformat=webp"},
    article: String,
    date: String,
    views: {type:Number, default: 0},
    location: {type: String, default: ""}
  });

  var models={
    newPost: mongoose.model("Articles", newPostSchema)
  }
  return models;
}
