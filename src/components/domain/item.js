var React = require('react');
var Record = require('../record/item.js');
var RecordStore = require('../record/store.js');
var RecordActions = require('../record/actions.js');
var RecordTable = require('../record/table.js');
var WhoisStore = require('../whois/store.js');
var WhoisActions = require('../whois/actions.js');
var WhoisTable = require('../whois/table.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			whois: WhoisStore.getResult(),
			records: RecordStore.getRecords()
		};
	},
	componentWillMount: function() {
		RecordStore.on('record.add', this.changeState);
		WhoisStore.on('whois.add', this.changeState);
		RecordActions.addRecordsByDomainQuery(this.props.data.uuid);
		WhoisActions.addWhoisByDomainQuery(this.props.data.uuid);
	},
	componentWillUnmount: function() {
		RecordStore.off('record.add', this.changeState);
		WhoisStore.off('whois.add', this.changeState);
	},
	changeState: function() {
		this.setState({
			whois: WhoisStore.getResult(),
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
				<div className="block">
					<h4>Domain Information</h4>
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
				</div>

				<div className="block">
					<i class="ion-ios-arrow-up"></i>
					<h5>Whois Data</h5>
					<WhoisTable data={this.state.whois} />
				</div>

				<div className="block">
					<h5>Records Data</h5>
					<RecordTable data={this.state.records} />
				</div>
			</div>
		)
	}
});
