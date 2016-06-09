var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({

	'text': String,
	'likes': Number
});

module.exports = mongoose.model('Tweet', tweetSchema);
