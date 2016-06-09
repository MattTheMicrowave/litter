var express = require('express');
var router = express.Router();
var TweetModel = require('../models/TweetModel.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  TweetModel.find(function(err, tweets) {
  res.render('index', { title: 'Express', tweets: tweets });
});
});

router.post('/tweets', function(req, res, next) {
	var tweet = new TweetModel({
		text : req.body.text,
    likes: req.body.likes
	});
	tweet.save(function(err, tweet) {
	res.redirect('/');
});
});
module.exports = router;
