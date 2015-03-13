var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	results: [],
	actions: [
		actions.getByDomain
	],
	getByDomain: function(uuid) {
		var self = this;
		$.get("/api/v1/whois/?duuid="+uuid)
		.done(function(data) {
			self.results = $.parseJSON(data);
			self.emit('diff.getbydomain.loaded');
		});
	},
	exports: {
		GetByDomain: function() { return this.results; }
	}
});
