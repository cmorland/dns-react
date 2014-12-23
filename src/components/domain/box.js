var React = require('react');
var Item = require('./item.js');
var Store = require('./store.js');
var Form = require('../form.js');
var Actions = require('./actions.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			result: Store.getResult(),
		};
	},
	componentWillMount: function () {
		Store.on('domain.loaded', this.loaded);
		if (this.props.params.query) {
			Actions.addDomainQuery(this.props.params.query);
		}
	},
	componentWillUnmount: function () {
		Store.off('domain.loaded', this.loaded);
	},
	loaded: function () {
		this.setState({
			result: Store.getResult()
		});
	},
	render: function() {
		var result = this.state.result;
		var nodes = '';
		if (!$.isEmptyObject(result)) {
			nodes = <Item data={result} />;
		}
		return (
			<div>
				<Form message="Perform a domain check."
					action={Actions.addDomainQuery} 
					store={Store} ns="domain" placeholder="example.com" />
				{nodes}
			</div>
		);
	}
});
