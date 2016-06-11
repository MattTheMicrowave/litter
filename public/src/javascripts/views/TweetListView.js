var Backbone = require('backbone');
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
