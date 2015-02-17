var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
	render: function() {
		var domain = this.props.data.domain;
		var added = this.props.data.added;
		added = moment(added).format("YYYY-MM-DD");
		return (
			<li><b>{domain.name}.{domain.tld.name}</b> <em>{added.toString()}</em></li>
		)
	}
});
