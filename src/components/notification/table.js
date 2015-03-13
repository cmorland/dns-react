var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('underscore');
var moment = require('moment');
var Store = require('./store.js');

module.exports = React.createClass({
	markAsRead: function(i) {
		Store.MarkAsRead(i);
	},
	render: function() {
		if (this.props.data.length == 0 ||
		   (this.props.data.length > 0 &&
		    this.props.data[0].messages.length == 0)) {
			return (
				<p>No notification information at present.</p>
			)
		}
		var note = this.props.data[0];
		var rows = note.messages.map(function(i) {
			var added = moment(i.added).format("YYYY-MM-DD HH:mm")
			var readAt = moment(i.read_at).format("YYYY-MM-DD HH:mm")
			return (
				<tr>
					<td>{i.message}</td>
					<td>
						<Link to="diff" params={{domain: i.domain.uuid}}>
							{i.domain.name}.{i.domain.tld.name}
						</Link>
					</td>
					<td>{added}</td>
					<td>
						<a 
							className="button small"
							onClick={this.markAsRead.bind(this, i)}
						>mark read</a></td>
				</tr>
			)
		}, this);
		var updated = moment(note.updated).format("YYYY-MM-DD HH:mm")
		return (
			<div>
				<label>Last updated {updated}.</label>
			<table className="u-full-width">
				<thead>
					<tr>
					<th>Message</th>
					<th>Domain</th>
					<th>When</th>
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
