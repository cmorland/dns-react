var React = require('react');
var Form = require('./form.js');
var List = require('./list.js');
var Store = require('./store.js');
var Table = require('./table.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			result: Store.getResult(),
		};
	},
	componentWillMount: function () {
		Store.onAny(this.changeState);
	},
	componentWillUnmount: function () {
		Store.offAny(this.changeState);
	},
	changeState: function () {
		this.setState({
			result: Store.getResult()
		});
	},
	render: function() {
		return (
			<div>
				<Form />
				<Table data={this.state.result} />
			</div>
		);
	}
});
