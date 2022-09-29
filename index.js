const express = require("express");
const _ = require('lodash');
const ejs = require("ejs");
const app = express();
const textarrfull=[
  "I gave a fuck but now like this before in my entire existence Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
  "I gave a fuck but now like this before in my entire existence Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
  "I gave a fuck but now like this before in my entire existence Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
  "I gave a fuck but now like this before in my entire existence Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
  "I gave a fuck but now like this before in my entire existence Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
  "I gave a fuck but now like this before in my entire existence Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
  "I gave a fuck but now like this before in my entire existence Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
  "I gave a fuck but now like this before in my entire existence Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli",
  "I gave a fuck but now like this before in my entire existence Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veliNeque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli"


]
const text = textarrfull.map(x => _.truncate(x, {
  "length": 300,
  "omission": "..."
}));
const titles=[
  "Dokter eet een raket",
  "Man vliegt en heeft lunch eet een raket",
  "Ijsbrand ijsbad ijsbadjematje eet een raket",
  "Dokter eet een raket",
  "Dokter eet een raket",
  "Dokter eet een raket",
]
const pictures =["https://images0.persgroep.net/rcs/fQHfEbeRmmxMtdsOCz3LO4IfYqE/diocontent/112687658/_crop/0/0/1580/893/_fitwidth/763?appId=93a17a8fd81db0de025c8abd1cca1279&quality=0.8&desiredformat=webp",
"https://scientias.nl/wp-content/uploads/2022/09/IJsbad.jpg",
"https://scientias.nl/wp-content/uploads/2022/09/IJsbad.jpg",
"https://scientias.nl/wp-content/uploads/2022/09/IJsbad.jpg",
"https://scientias.nl/wp-content/uploads/2022/09/IJsbad.jpg",
"https://scientias.nl/wp-content/uploads/2022/09/IJsbad.jpg",
"https://scientias.nl/wp-content/uploads/2022/09/IJsbad.jpg",
"https://scientias.nl/wp-content/uploads/2022/09/IJsbad.jpg",
"https://scientias.nl/wp-content/uploads/2022/09/IJsbad.jpg",]

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get("/", (req,res)=>{

  res.render("index", {text:text,
  pictures: pictures,
  titles: titles
  });
})

app.get("/upload", (req,res) =>{
  res.render("upload");
})
app.listen(3000, ()=>{
  console.log("server 3000 online");
})
