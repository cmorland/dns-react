var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('underscore');
var moment = require('moment');

module.exports = React.createClass({
	render: function() {
		if (this.props.data.length == 0) {
			return (
				<p>No watcher information at present.</p>
			)
		}
		var rows = this.props.data.map(function(i) {
			var added = moment(i.added).format("YYYY-MM-DD")
			var updated = moment(i.updated).format("YYYY-MM-DD HH:mm")
			return (
				<tr>
					<td>{i.domain.name + "." + i.domain.tld.name}</td>
					<td>{i.interval.value}</td>
					<td>{i.logs.length}</td>
					<td>{added}</td>
					<td>{updated}</td>
				</tr>
			)
		});
		return (
			<table className="u-full-width">
				<thead>
					<tr>
					<th>Domain</th>
					<th>Interval</th>
					<th>Count</th>
					<th>Added</th>
					<th>Last Updated</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		)
	}
});
