var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	results: [],
	actions: [
		actions.query,
		actions.add
	],
	add: function(watcher) {
		var self = this;
		$.post("/api/v1/watchers/", JSON.stringify(watcher))
		.done(function(data) {
			actions.query();
			self.emit('watcher.added');
	       	})
	       	.fail(function(data) {
			self.emit('watcher.add.error');
	       	});
	},
	query: function(query) {
		var self = this;
		$.get("/api/v1/watchers/")
		.done(function(data) {
			self.results = $.parseJSON(data);
			self.emit('watcher.loaded');
		})
		.fail(function(data) {
			self.emit('watcher.error', 'No watcher result.');
		});
	},
	exports: {
		getResults: function() {
			return this.results;
		}
	}
});
