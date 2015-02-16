var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	result: {},
	actions: [
		actions.addWhoisByDomainQuery,
		actions.queryDomain,
		actions.clear
	],
	clear: function() {
		this.result = {};
	},
	addWhoisByDomainQuery: function(query) {
		this.emit('whois.query');
		var self = this;
		$.get("/api/v1/whois/?limit=1&duuid="+query)
		.done(function(data) {
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
