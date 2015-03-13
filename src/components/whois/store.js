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
		console.log('clear');
		this.result = {};
	},
	addWhoisByDomainQuery: function(query) {
		this.clear();
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
		this.clear();
		var self = this;
		$.get("/api/v1/whois/?limit=1&name="+query)
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
			console.log('getResult');
			return this.result;
		}
	}
});
