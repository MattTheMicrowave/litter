

$(document).on('ready', function() {
  var TweetsCollection = require('./collections/TweetsCollection')
  var TweetListView = require('./views/TweetListView');
  var FormView = require('./views/FormView');

  var tweets = new TweetsCollection();
  var tweetListView = new TweetListView({ collection: tweets });
  var formView = new FormView({ collection: tweets });

  tweets.fetch({
    success: function() {
      console.log('y');
      tweetListView.render();
      formView.render();
      $("#tweet-list").html(tweetListView.el);
      $("#tweet-form").html(formView.el);
    }
  });




});
