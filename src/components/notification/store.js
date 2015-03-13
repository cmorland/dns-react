var flux = require('flux-react');

var actions = flux.createActions([
	'query',
	'markAsRead'
]);

module.exports = flux.createStore({
	results: [],
	actions: [
		actions.query,
		actions.markAsRead
	],
	query: function(query) {
		var self = this;

		var paramsArr = [];
		for (var k in query) {
			if (query.hasOwnProperty(k)) {
				paramsArr.push(k+'='+query[k]);
			}
		}
		var params = paramsArr.join('&');
		if (params.length > 0) {
			params = '?' + params
		}
		$.get("/api/v1/notifications/"+params)
		.done(function(data) {
			self.results = $.parseJSON(data);
			self.emit('notification.loaded');
		})
		.fail(function(data) {
			self.emit('notification.error', 'No notification result.');
		});
	},
	markAsRead: function(message) {
		var self = this;
		// use a timer and internal state to bunch these
		var messages = [];
		messages.push(message);
		console.log(messages);
		$.post('/api/v1/notifications/archive/', JSON.stringify(messages))
		.done(function(data) {
			console.log('markAsRead done');
			actions.query();
		})
		.fail(function(data) {
			console.log('error in markAsRead');
		});
	},
	exports: {
		Query: function(query) {
			actions.query(query);
		},
		MarkAsRead: function(message) {
			actions.markAsRead(message);
		},
		GetResults: function() {
			return this.results;
		}
	}
});
