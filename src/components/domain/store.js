var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	result: {},
	actions: [
		actions.addDomainQuery
	],
	addDomainQuery: function(query) {
		var self = this;
		$.get("/api/v1/domain/" + query)
		.done(function(data) {
			self.result = $.parseJSON(data);
			self.emitChange();
		})
		.fail(function(data) {
			self.emit('domain.error', "No results");	
		});
	},
	exports: {
		getResult: function() {
			return this.result;
		}
	}
});
