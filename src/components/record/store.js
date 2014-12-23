var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	records: [],
	actions: [
		actions.addRecordsByDomainQuery,
		actions.clear
	],
	clear: function() {
		console.log('records clear');
		this.records = [];
	},
	addRecordsByDomainQuery: function(query) {
		var self = this;
		$.get("/api/v1/domain/" + query + "/records")
		.done(function(data) {
			self.records = $.parseJSON(data);
			self.emit('record.add');
		})
		.fail(function(data) {
			self.emit('record.error', "No records");	
		});
	},
	exports: {
		getRecords: function() {
			return this.records;
		}
	}
});
