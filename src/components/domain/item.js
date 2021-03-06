var React = require('react');
var RecordStore = require('../record/store.js');
var RecordActions = require('../record/actions.js');
var RecordTable = require('../record/table.js');
var WhoisStore = require('../whois/store.js');
var WhoisActions = require('../whois/actions.js');
var WhoisTable = require('../whois/table.js');
var Store = require('./store');

function secondsToString(seconds) {
	var numyears = Math.floor(seconds / 31536000);
	var numdays = Math.floor((seconds % 31536000) / 86400); 
	var numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
	var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
	var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
	return numyears + " years " +  numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
}

module.exports = React.createClass({
	getInitialState: function() {
		return {
			whois: WhoisStore.getResult(),
			records: RecordStore.getRecords(),
			toggleWhoisData: true,
			toggleRecordsData: true,
			showRawWhois: true
		};
	},
	componentWillMount: function() {
		Store.on('domain.loaded', this.loaded);
		RecordStore.on('record.loaded', this.changeState);
		WhoisStore.on('whois.loaded', this.changeState);
		this.loaded();
	},
	componentWillUnmount: function() {
		Store.off('domain.loaded', this.loaded);
		RecordStore.off('record.loaded', this.changeState);
		WhoisStore.off('whois.loaded', this.changeState);
	},
	loaded: function() {
		RecordActions.clear();
		WhoisActions.clear();
		RecordActions.addRecordsByDomainQuery(this.props.data.uuid);
		WhoisActions.addWhoisByDomainQuery(this.props.data.uuid);
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
					<h5>Domain Information</h5>
					<table className="u-full-width">
						<thead>
							<tr>
								<th>Name</th>
								<th>TLD</th>
								<th>Link</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{domain.name}</td>
								<td>{domain.tld.name}</td>
								<td><a href={"http://" + domain.name + "." + domain.tld.name} target="_blank">http://{domain.name+ "." + domain.tld.name}</a></td>
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
