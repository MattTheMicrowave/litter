var express = require('express');
var router = express.Router();
var TweetModel = require('../models/TweetModel.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  TweetModel.find(function(err, tweets) {
  res.render('index', { title: 'Express', tweets: tweets });
});
});


module.exports = router;
