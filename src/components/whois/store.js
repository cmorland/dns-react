var flux = require('flux-react');
var actions = require('./actions.js');

module.exports = flux.createStore({
	results: [],
	actions: [
		actions.addQuery
	],
	addQuery: function(query) {
		console.log("query: " + query);
		this.emitChange();
	},
	exports: {
		getResults: function() {
			return this.results;
		}
	}
});
