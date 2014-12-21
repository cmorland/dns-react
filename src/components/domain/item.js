var React = require('react');
var Record = require('../record/item.js');
var RecordStore = require('../record/store.js');
var RecordActions = require('../record/actions.js');
var RecordTable = require('../record/table.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			records: []
		};
	},
	componentWillMount: function() {
		RecordStore.on('record.add', this.changeState);
		console.log("willMount: " + this.props.data.uuid);
		RecordActions.addRecordsByDomainQuery(this.props.data.uuid);
	},
	componentWillUnmount: function() {
		RecordStore.off('record.add', this.changeState);
	},
	changeState: function() {
		console.log(RecordStore.getRecords());
		this.setState({
			records: RecordStore.getRecords()
		});
	},
	render: function() {
		var domain = this.props.data;
		if ($.isEmptyObject(domain)) {
			return null;
		}
		return (
			<div>
				<table className="u-full-width">
					<thead>
						<tr>
							<th>Name</th>
							<th>TLD</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{domain.name}</td>
							<td>{domain.tld.name}</td>
						</tr>
					</tbody>
				</table>
				<RecordTable data={this.state.records} />
			</div>
		)
	}
});
