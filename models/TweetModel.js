var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({

	'text': String,
	'likes': {
		type : Number, default : 0
	}
});

module.exports = mongoose.model('Tweet', tweetSchema);
