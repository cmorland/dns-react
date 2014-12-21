var React = require('react');
var Item = require('./item.js');

module.exports = React.createClass({
	render: function() {
		var itemNodes = this.props.data.map(function (item) {
			return (
				<Item data={item} />
			);
		});
		return (
			<ul className="itemList">
				{itemNodes}
			</ul>
		);
	}
});
