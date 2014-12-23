var React = require('react');
var Store = require('./store.js');
var Actions = require('./actions.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			error: "",
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var query = this.refs.query.getDOMNode().value.trim();
		if (!query) { 
			return;
		}
		Actions.addDomainQuery(query);
		this.errorReset();
	},
	componentWillMount: function() {
		Store.on('domain.error', this.error);
	},
	componentWillUnmount: function() {
		Store.off('domain.error', this.error);
	},
	error: function(err) {
		this.setState({
			error: err
		});
	},
	errorReset: function() {
		this.setState({
			error: ""
		});
	},
	render: function() {
		return (
			<div>
				<p className="noBottomMargin">Perform a domain query.</p>
				<form onSubmit={this.handleSubmit}>
					<input className="u-pull-left searchBar" type="text" placeholder="example.com" ref="query" />
					<input className="searchSubmit" type="submit" value="search" />
					<p>{this.state.error}</p>
				</form>
			</div>
		);
	}
});
