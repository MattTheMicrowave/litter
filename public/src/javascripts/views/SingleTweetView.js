var _ = require('lodash');
var Backbone = require('backbone');

var SingleTweetView = Backbone.View.extend({
	el: '<li></li>',

	template: _.template('\
		<div id="imgdiv"><span><img class="pic"></span></div>\
		<div id="infodiv"><span><%= tweet.get("text") %></span></div>\
		<br>\
		<div id="reactdiv"><span class="like">LIKE&nbsp;<i class="fa fa-thumbs-up" aria-hidden="true"></i>&nbsp;<%=tweet.get("likes") %></span>\
		&nbsp;&nbsp;&nbsp;&nbsp;\
		<span class="delete">DELETE&nbsp;<i class="fa fa-ban" aria-hidden="true"></i></span></div>\
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
	}
});

  module.exports = SingleTweetView;
