var React = require('react');
var Item = require('./item.js');

module.exports = React.createClass({
	render: function() {
		var domainNodes = this.props.data.map(function (domain) {
			return (
				<Item data={domain} />
			);
		});
		return (
			<ul className="domainList">
				{domainNodes}
			</ul>
		);
	}
});
