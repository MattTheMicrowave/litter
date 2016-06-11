var TweetModel = Backbone.Model.extend ({
	urlRoot: '/tweets',
	idAttribute: '_id',

});

module.exports = TweetModel;
