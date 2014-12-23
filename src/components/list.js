var React = require('react');

module.exports = React.createClass({
	propTypes: {
		item: React.PropTypes.object.isRequired
	},
	render: function() {
		var Item = this.props.item;
		var nodes = this.props.data.map(function (i) {
			return (
				<Item data={i} />
			);
		});
		return (
			<ul className="list">
				{nodes}
			</ul>
		);
	}
});
