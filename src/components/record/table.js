var React = require('react');
var moment = require('moment');

formatTime = function(time) {
	var ret = time % 60 + "s";
	time = Math.floor(time / 60);
	if (time !== 0) {
		ret = time % 60 + "min "+ret;
		time = Math.floor(time / 60);
		if (time !== 0) {
			ret = time % 60 + "h "+ret;
			time = Math.floor(time / 24);
			if (time !== 0) {
				ret = time % 60 + "d "+ret;
			}
		}
	}           
	return ret;
};

module.exports = React.createClass({
	render: function() {
		if (this.props.data.length == 0) {
			return (
				<p>No Record information at present.</p>
			)
		}

		var rows = [];
		var lastParseDate = '';
		this.props.data.forEach(function(record) {
			var parseDate = moment(record.parse_date).format('DD-MM-YYYY');
			var ttl = formatTime(record.args.ttl);
			var current = <span className="block small">current</span>
			if (lastParseDate == '') {
				lastParseDate = parseDate;
			} else if (lastParseDate != parseDate) {
				current = null;
			}
			rows.push(
				<tr>
					<td>{record.name}</td>
					<td>{parseDate}</td>
					<td>{record.type.name.toUpperCase()}</td>
					<td>{ttl}</td>
					<td>{record.args.args}</td>
					<td>{current}</td>
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
						<th></th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		)
	}
});
	
