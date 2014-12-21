var React = require('react');
var List = require('./list.js');
var Store = require('./store.js');
var Form = require('./form.js');
var Actions = require('./actions.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			results: Store.getResults(),
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
			results: Store.getResults()
		});
	},
	render: function() {
		var domains = this.state.results;
		return (
			<div>
				<Form />
				<List data={this.state.results} />
			</div>
		);
	}
});
