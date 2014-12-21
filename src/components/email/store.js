var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	results: [],
	actions: [
		actions.getDomainsByEmailQuery
	],
	getDomainsByEmailQuery: function(query) {
		var self = this;
		$.get("/api/v1/domain/query/email/" + query)
		.done(function(data) {
			self.results = $.parseJSON(data);
			self.emitChange();
		})
		.fail(function(data) {
			self.emit('email.error', "No results");	
		});
	},
	exports: {
		getResults: function() {
			return this.results;
		}
	}
});
