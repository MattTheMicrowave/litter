var TweetModel = require('../models/TweetModel.js');

/**
*TweetController.js
*
* @description :: Server-side logic for managing tweets
*/
module.exports = {

/**
*
/**
  * TweetController.list()
  */
  list: function (req, res) {
    TweetModel.find(function (err, tweets) {
      return res.json(tweets);
    });
  },

  /**
  * TweetController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    TweetModel.findOne({_id: id}, function (err, tweet) {
      return res.json(tweet);
    });
  },

  /**
  * TweetController.create()
  */
  create: function (req, res) {
    var tweet = new TweetModel({
            text : req.body.text,
            likes: req.body.likes
    });

    tweet.save(function (err, tweet) {
      return res.json(tweet);
    });
  },

  /**
  * TweetController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    TweetModel.findOne({_id: id}, function (err, tweet) {
      tweet.text = req.body.text ? req.body.text : tweet.text;
      tweet.likes = req.body.likes ? req.body.likes : tweet.likes;
      tweet.save(function (err, tweet) {
        return res.json(tweet);
      });
    });
  },

  /**
  * TweetController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    TweetModel.findByIdAndRemove(id, function (err, tweet) {
      return res.json(tweet);
    });
  }
};
