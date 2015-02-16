var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
	render: function() {
		if (this.props.data.length == 0) {
			return (
				<p>No Record information at present.</p>
			)
		}

		var rows = [];
		this.props.data.forEach(function(record) {
			var parse_date = moment(record.parse_date).format('DD-MM-YYYY');
			rows.push(
				<tr>
					<td>{record.name}</td>
					<td>{parse_date}</td>
					<td>{record.type.name}</td>
					<td>{record.args.ttl}</td>
					<td>{record.args.args}</td>
				</tr>
			);
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
	
