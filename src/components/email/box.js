var React = require('react');
var List = require('./list.js');
var Store = require('./store.js');
var Form = require('../form.js');
var Actions = require('./actions.js');
var Loader = require('react-loader');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			results: Store.getResults(),
			loaded: false
		};
	},
	componentWillMount: function () {
		Store.onAny(this.changeState);
		if (this.props.params.query) {
			Actions.getDomainsByEmailQuery(this.props.params.query);
		}
	},
	componentWillUnmount: function () {
		Store.offAny(this.changeState);
	},
	changeState: function () {
		this.setState({
			results: Store.getResults(),
			loaded: true
		});
	},
	render: function() {
		var domains = this.state.results;
		return (
			<div>
				<Form message="Perform a domain check based on email."
					action={Actions.getDomainsByEmailQuery} 
					store={Store} ns="email"
					placeholder="admin@example.com" />
				<List data={this.state.results} />
			</div>
		);
	}
});
