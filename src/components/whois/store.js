var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	result: {},
	actions: [
		actions.addWhoisByDomainQuery,
		actions.queryDomain
	],
	addWhoisByDomainQuery: function(query) {
		var self = this;
		$.get("/api/v1/domain/" + query + "/whois?limit=1")
		.done(function(data) {
			console.log(data);
			self.result = $.parseJSON(data)[0];
			self.emit('whois.loaded');
		})
		.fail(function(data) {
			self.emit('whois.error', 'No whois result.');	
		});
	},
	queryDomain: function(query) {
		var self = this;
		$.post("/api/v1/whois/", '{"query": "'+query+'"}"')
		.done(function(data) {
			console.log(data);
			self.result = $.parseJSON(data)[0];
			self.emit('whois.loaded');
		})
		.fail(function(data) {
			self.emit('whois.error', 'No whois result.');
		});
	},
	exports: {
		getResult: function() {
			return this.result;
		}
	}
});
