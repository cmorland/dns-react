var React = require('react');
var Form = require('./item.js');
var Store = require('./store.js');
var Actions = require('./actions.js');

module.exports = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var query = this.refs.query.getDOMNode().value.trim();
		if (!query) { 
			return;
		}
		Actions.addQuery(query);
		this.refs.query.getDOMNode().value = '';
		return;
	},
	render: function() {
		return (
			<form className="domainForm" onSubmit={this.handleSubmit}>
				<input className="u-full-width" type="text" placeholder="example.com" ref="query" />
				<input type="submit" value="post" />
			</form>
		);
	}
});
