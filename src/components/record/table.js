var React = require('react');
var moment = require('moment');
var Record = require('./item.js');

module.exports = React.createClass({
	render: function() {
		var rows = [];
		this.props.data.forEach(function(record) {
			rows.push(<Record data={record} />);
		});
		return (
			<table className="u-full-width">
				<thead>
					<tr>
						<th>Name</th>
						<th>Date</th>
						<th>Type</th>
						<th>TTL</th>
						<th>Args</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}
});
	
