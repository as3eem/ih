const express = require('express');
const router = express.Router();

// Article Model
let Article = require('../models/article');


// single category view
router.get('/all', function(req, res, next) {
    console.log(req.query.cat);
    var required_category = req.query.cat;
    // use this to populate the similar results
    Article.find({category: required_category},function(err,result){
        if (err)  throw err;

        // your single category blog result

        var x = JSON.stringify(result, null, 2);

        console.log(result);

        // enter the page which you want to render and double if there is ant requirement to JSON stringyfy thr result
        // res.render('your_all_blog_view_page', {data: result});

        res.render('all', {
            result: result
        });    });

});

// all category view
router.get('/cat', function(req, res, next) {
  Article.aggregate()
      .group({
          "_id": "$category",
          "entry": {
              "$push": {
                  "title": "$title",
                  "author": "$author",
                  "category": "$category",
                  "body": "$body",
                  "unique_id": "$_id"
              }
          }
      })
      .exec(function (err, result){
          if (err) return next(err)
          var xyz = JSON.stringify(result, null, 2);
          console.log('-------------->', result[0].entry[0].title);
          res.render('cat', {
              data: result
          })
      });
});

router.get('/add', function(req, res) {
    Article.find().distinct('category', function(error, cats) {
        if(!error){
            res.render('add_article', {
                title:'Add Article',
                cats: cats
            });
        }
        else{
            console.log(error);
        }
    });
  });


// Add Submit POST Route
router.post('/add', function(req, res){
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    // let us know first if the category we are getting is selected "Choose Cateogry" i.e. NULL
    // and in that case we must avoid reading that category and should read manual input of category
    // by name="cat"
    article.category = req.body.category.length>0?req.body.category:req.body.cat;
    article.body = req.body.body;

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        res.redirect('/');
      }
    });
});

// Get Single Article
router.get('/:id', function(req, res ){
  Article.findById(req.params.id, function(err, articles){
      res.render('article', {
        articles:articles
    });
  });
});

module.exports = router;
