var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({

	'text': String,
	'like': 0
});

module.exports = mongoose.model('Tweet', tweetSchema);
