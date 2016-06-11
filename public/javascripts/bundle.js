(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


// $(document).on('ready', function() {
  var TweetsCollection = require('./collections/TweetsCollection')
  var TweetListView = require('./views/TweetListView');
  var FormView = require('./views/FormView');
  var TweetModel = require('./models/TweetModel');

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




// });

},{"./collections/TweetsCollection":2,"./models/TweetModel":3,"./views/FormView":4,"./views/TweetListView":6}],2:[function(require,module,exports){
var TweetModel = require('../models/TweetModel');


var TweetsCollection = Backbone.Collection.extend({
	url: '/tweets',
	model: TweetModel,

});

module.exports = TweetsCollection;

},{"../models/TweetModel":3}],3:[function(require,module,exports){
var TweetModel = Backbone.Model.extend ({
	urlRoot: '/tweets',
	idAttribute: '_id',

});

module.exports = TweetModel;

},{}],4:[function(require,module,exports){
var TweetModel = require('../models/TweetModel');

var FormView = Backbone.View.extend({
	el: '<form method="POST" action="/tweets">\
		<input id="tweet-input" type="text" name="text">\
		<input type="submit" value="Toss It" id="mysubmitbutton">\
		</form>\
		',
	// render: function() {
	// 	this.listenTo(this.el, 'submit', function(event) {
	// 		event.preventDefault();
	//
	// });
	//
	// return this;
	//
	// },

	events: {
		'submit' : 'stopForm'
	},

	stopForm: function (event) {
		event.preventDefault();
		var _this = this;
		var newtweet = new TweetModel;
		newtweet.set({ text : $('#tweet-input').val(), likes: 0});
		newtweet.save(null, {
		success: function () {
		_this.collection.add(newtweet);
		}
	  });

		$('#tweet-input').val("");

	}

});

module.exports = FormView;

},{"../models/TweetModel":3}],5:[function(require,module,exports){
var SingleTweetView = Backbone.View.extend({
	el: '<li></li>',

	template: _.template('\
		<div id="imgdiv"><span><img class="pic"></span></div>\
		<div id="infodiv"><span><%= tweet.get("text") %></span></div>\
		<br>\
		<div id="reactdiv"><span class="like">LIKE&nbsp;<i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;<%=tweet.get("likes") %></span>\
		&nbsp;&nbsp;&nbsp;&nbsp;\
		<span class="delete">DELETE&nbsp;<i class="fa fa-ban" aria-hidden="true"></i></span></div>\
	'),

	events: {
		'click .like' : 'likeCounter',
		'click .delete' : 'remove'
	},

	initialize: function () {
		this.listenTo(this.model, 'sync', function() {
				// console.log('ready');
				// this.render();
		});
	},

	likeCounter: function() {

		var likeCount = this.model.get("likes");
		this.model.set("likes", likeCount + 1);
		this.model.save();
		this.render();
		console.log('yy');
	},

	remove: function() {

		this.model.destroy();

	},

	render: function() {
			$(this.el).html(this.template({ tweet: this.model }));
			return this;
	}
});

  module.exports = SingleTweetView;

},{}],6:[function(require,module,exports){
var SingleTweetView = require('./SingleTweetView');

var TweetListView = Backbone.View.extend({
	el: '<ul></ul>',

	// template: _.template('\
	// 	<ul>\
	// 	<% tweets.each(function(tweet) { %>\
	// 		<li><%= tweet.get("text") %></li>\
	// 	<% }) %>\
	// 	</ul>\
	// '),

	render: function() {
		var that = this;
		$(this.el).html('');
		this.collection.each(function(tweet) {
			var singleTweetView = new SingleTweetView({ model: tweet});
			$(that.el).append(singleTweetView.render().el);

		});
		return this;
	},

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	}
});

  module.exports = TweetListView;

},{"./SingleTweetView":5}]},{},[1]);
