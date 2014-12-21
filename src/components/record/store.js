var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	records: [],
	actions: [
		actions.addRecordsByDomainQuery
	],
	addRecordsByDomainQuery: function(query) {
		console.log("addRecordByDomainQuery records: " + query);
		var self = this;
		$.get("/api/v1/domain/" + query + "/records")
		.done(function(data) {
			self.records = $.parseJSON(data);
			self.emit('record.add');
		})
		.fail(function(data) {
			self.emit('record.error', "No recordss");	
		});
	},
	exports: {
		getRecords: function() {
			return this.records;
		}
	}
});
