var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('underscore');
var moment = require('moment');

module.exports = React.createClass({
	render: function() {
		if (this.props.data.length == 0) {
			return null;
		}
		var rows = this.props.data.map(function(i) {
			var added = moment(i.added).format("YYYY-MM-DD")
			var updated = moment(i.updated).format("YYYY-MM-DD HH:mm")
			var link = null;
			if (i.logs.length > 1 ) {
				link = <Link className="button small" to="diff" params={{domain: i.domain.uuid}}>view diff</Link>
			}
			return (
				<tr>
					<td><Link to="domain" params={{query: i.domain.uuid}}>{i.domain.name + "." + i.domain.tld.name}</Link></td>
					<td>{i.interval.value}</td>
					<td>{added}</td>
					<td>{updated}</td>
					<td>{i.logs.length}</td>
					<td>{link}</td>
				</tr>
			)
		});
		return (
			<div>
			<table className="u-full-width">
				<thead>
					<tr>
					<th>Domain</th>
					<th>Interval</th>
					<th>Added</th>
					<th>Last Updated</th>
					<th>Versions</th>
					<th></th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>
		)
	}
});
