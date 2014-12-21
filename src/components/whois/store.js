var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	result: {},
	actions: [
		actions.addWhoisByDomainQuery
	],
	addWhoisByDomainQuery: function(query) {
		var self = this;
		$.get("/api/v1/domain/" + query + "/whois?limit=1")
		.done(function(data) {
			self.result = $.parseJSON(data)[0];
			self.emit('whois.add');
		})
		.fail(function(data) {
			self.emit('whois.error', "No whois");	
		});
	},
	exports: {
		getResult: function() {
			return this.result;
		}
	}
});
