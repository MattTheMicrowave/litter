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
	render: function() {
		this.listenTo(this.el, 'submit', function(event) {
			event.preventDefault();

	});

	return this;

	},

	events: {
		'submit' : 'stopForm'
	},

	stopForm: function (event) {
		event.preventDefault();
		var newtweet = new TweetModel;
		newtweet.set({ text : $('#tweet-input').val() });
		newtweet.save();
		this.collection.add(newtweet);
		$('#tweet-input').val("");
	}

});

var TweetView = Backbone.View.extend({
	el: '<div></div>',

	template: _.template('\
		<ul>\
		<% tweets.each(function(tweet) { %>\
			<li><%= tweet.get("text") %></li>\
		<% }) %>\
		</ul>\
	'),

	render: function() {
		$(this.el).html(this.template({ tweets: this.collection
		}));
	},

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	}
});

	var tweets = new TweetsCollection();
	var tweetsView = new TweetView({ collection: tweets });
	var formView = new FormView({ collection: tweets });

	tweets.fetch({
		success: function() {
			console.log('y');
			tweetsView.render();
			formView.render();
			$("#tweet-list").html(tweetsView.el);
			$("#tweet-form").html(formView.el);
		}
	});
