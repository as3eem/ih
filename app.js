const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
let db = mongoose.connection;

//check connection
db.once('open',function(){
  console.log('Connected to MongoDB');
});

//check for db errors
db.on('error', function(err){
  console.log(err);
});

const app = express();

//bring in models
let Article = require('./models/article');

app.set("views", __dirname + "/views"); 
app.set('view engine', 'ejs');


//Use body-parser
app.use(bodyParser.urlencoded({ extended: false })); 

// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//home 
app.get('/', function(req, res){
  Article
   .find({}, function(err, articles){
    if(err){
      console.log(err);
    }else {
     res.render('index', {
       title:'Articles',
       articles: articles
     });
   }
  }).limit(6);
  
});

// Route Files
let articles = require('./routes/articles');
app.use('/articles', articles);

let contact = require('./routes/contact');
app.use('/send', contact);


//Tell Express where we keep our index.ejs
//app.set("views", __dirname + "/views"); 

app.listen(3000, () => console.log('Server started...'));