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
		Store.onAny(this.changeState);
		if (this.props.params.query) {
			Actions.addDomainQuery(this.props.params.query);
		}
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
		var domain = this.state.result;
		var domainNode = '';
		if (!$.isEmptyObject(domain)) {
			domainNode = <Item data={domain} />;
		}
		return (
			<div>
				<Form message="Perform a domain check." action={Actions.addDomainQuery} store={Store} ns="domain" placeholder="example.com" />
				{domainNode}
			</div>
		);
	}
});
