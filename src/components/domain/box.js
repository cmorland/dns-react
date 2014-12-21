var React = require('react');
var Item = require('./item.js');
var Store = require('./store.js');

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
		console.log("changeState: " + Store.getResult());
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
				{domainNode}
			</div>
		);
	}
});
