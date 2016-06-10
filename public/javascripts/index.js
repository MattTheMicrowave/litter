var TweetModel = Backbone.Model.extend ({
	urlRoot: '/tweets',
	idAttribute: '_id',

});

var TweetsCollection = Backbone.Collection.extend({
	url: '/tweets',
	model: TweetModel,

});

var FormView = Backbone.View.extend({
	el: '<form method="POST" action="/tweets">\
		<input id="tweet-input" type="text" name="text">\
		<input type="submit" value="Submit">\
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

var SingleTweetView = Backbone.View.extend({
	el: '<li></li>',

	template: _.template('\
		<%= tweet.get("text") %>\
		<br>\
		<span class="like">LIKE <%=tweet.get("likes") %></span>\
		<br>\
		<span class="delete">DELETE</span>\
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
	},


});

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
