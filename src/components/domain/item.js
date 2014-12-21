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
			records: RecordStore.getRecords(),
			toggleWhoisData: false,
			toggleRecordsData: false,
			showRawWhois: false
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
	handleToggleWhois: function(e) {
		var state = this.state;
		state.toggleWhoisData = !state.toggleWhoisData;
		this.setState(state);
	},
	handleToggleRawWhois: function(e) {
		var state = this.state;
		state.showRawWhois = !state.showRawWhois;
		this.setState(state);
	},
	handleToggleRecords: function(e) {
		var state = this.state;
		state.toggleRecordsData = !state.toggleRecordsData;
		this.setState(state);
	},
	render: function() {
		var domain = this.props.data;
		if ($.isEmptyObject(domain)) {
			return null;
		}
		var recordsData = undefined;
		var recordsToggle = "ion-plus";
		if (this.state.toggleRecordsData) {
			recordsToggle = "ion-minus";
			recordsData = <RecordTable data={this.state.records} />;
		}
		var whoisData = undefined;
		var whoisToggle = "ion-plus";
		if (this.state.toggleWhoisData) {
			whoisToggle = "ion-minus";
			whoisData = <WhoisTable raw={this.state.showRawWhois} data={this.state.whois} />;
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
					<i className={whoisToggle + " u-pull-right"} onClick={this.handleToggleWhois}></i>
					<i className="u-pull-right ion-code" onClick={this.handleToggleRawWhois}></i>
					<h5>Whois Data</h5>
					{whoisData}
				</div>

				<div className="block">
					<i className={recordsToggle + " u-pull-right"} onClick={this.handleToggleRecords}></i>
					<h5>Records Data</h5>
					{recordsData}
				</div>
			</div>
		)
	}
});
