var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	result: {},
	actions: [
		actions.query,
		actions.clear
	],
	clear: function() {
		this.result = {};
	},
	query: function(query) {
		this.emit('domain.query');
		var self = this;
		$.get('/api/v1/domain/' + query)
		.done(function(data) {
			self.result = $.parseJSON(data);
			self.emit('domain.loaded');
		})
		.fail(function(data) {
			self.emit('domain.error', 'No results');	
		});
	},
	exports: {
		getResult: function() {
			return this.result;
		}
	}
});
