var React = require('react');
var Form = require('./item.js');
var Store = require('./store.js');
var Actions = require('./actions.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			error: ''
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var query = this.refs.query.getDOMNode().value.trim();
		if (!query) { 
			return;
		}
		Actions.queryDomain(query);
		this.refs.query.getDOMNode().value = '';
		return;
	},
	render: function() {
		return (
			<div>
				<p className="noBottomMargin">Perform a domain whois query.</p>
				<form onSubmit={this.handleSubmit}>
					<input className="searchBar u-pull-left" type="text" placeholder="example.com" ref="query" />
					<input className="searchSubmit" type="submit" value="post" />

					<p>{this.state.error}</p>
				</form>
			</div>
		);
	}
});
