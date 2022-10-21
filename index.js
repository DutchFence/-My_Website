const express = require("express");
const _ = require('lodash');
const ejs = require("ejs");
const app = express();
const dotenv = require('dotenv');
const bodyparser= require("body-parser");
const mongoose=require("mongoose");
const session = require("express-session");

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const homeRouter = require("./routes/home.js");
const uploadRouter = require("./routes/upload.js");
const articleRouter = require("./routes/articles.js");
const searchRouter = require("./routes/search.js");
const loginRouter = require("./routes/login.js");


dotenv.config();


app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


const uploadCode = process.env.UPLOAD;
const port = process.env.PORT
const password = process.env.PASSWORD;
const login = process.env.LOGIN;
const url = "mongodb+srv://DutchFence:"+password+"@dutchfence.totrbi4.mongodb.net/?retryWrites=true&w=majority";
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error('Error connecting to the database. '+err);
    });





app.use("/",  homeRouter);
app.use("/"+ uploadCode, uploadRouter);
app.use("/article", articleRouter);
app.use("/search", searchRouter);
app.use("/"+login, loginRouter);




app.listen(3000, ()=>{
  console.log("server 3000 online");
})
