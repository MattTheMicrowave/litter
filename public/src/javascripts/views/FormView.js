var Backbone = require('backbone');
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
