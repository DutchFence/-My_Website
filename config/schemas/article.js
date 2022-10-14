module.exports = function(mongoose){

  let commentSchema = new mongoose.Schema({
    commentator : String,
    comment : String,
    email : {type:String, default:"not given"}
  });

  let articleSchema = new mongoose.Schema({
    title: String,
    tag: String,
    description: String,
    thumbnail: {type:String, default: "https://images0.persgroep.net/rcs/fQHfEbeRmmxMtdsOCz3LO4IfYqE/diocontent/112687658/_crop/0/0/1580/893/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8&desiredformat=webp"},
    article: String,
    date: String,
    views: {type:Number, default: 0},
    comments: [commentSchema]
    });

  var models={
    Article: mongoose.model("Article", articleSchema)
  }
  return models;
}
