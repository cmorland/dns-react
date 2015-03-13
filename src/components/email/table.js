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
			return (
				<tr>
					<td>
						<Link to="domain" params={{query: i.uuid}}>
							{i.name + "." + i.tld.name}
						</Link>
					</td>
				</tr>
			)
		});
		return (
			<div className="block">
				<table className="u-full-width">
					<thead>
						<tr>
							<th>Domain</th>
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
