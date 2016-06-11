var TweetsCollection = Backbone.Collection.extend({
	url: '/tweets',
	model: TweetModel,

});

module.exports = TweetsCollection;
