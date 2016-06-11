var Backbone = require('backbone');
var TweetModel = require('../models/TweetModel');


var TweetsCollection = Backbone.Collection.extend({
	url: '/tweets',
	model: TweetModel,

});

module.exports = TweetsCollection;
