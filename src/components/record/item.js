var React = require('react');
var moment = require('moment');
var Record = require('../record/item.js');
var RecordStore = require('../record/store.js');

module.exports = React.createClass({
	render: function() {
		var record = this.props.data;
		var parse_date = moment(record.parse_date).format('DD-MM-YYYY');
		return (
					<tr>
						<td>{record.name}</td>
						<td>{parse_date}</td>
						<td>{record.type.name}</td>
						<td>{record.args.ttl}</td>
						<td>{record.args.args}</td>
					</tr>
		)
	}
});
