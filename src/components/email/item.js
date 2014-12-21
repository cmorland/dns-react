var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
	render: function() {
		var item = this.props.data;
		var name = item.name + "." + item.tld.name;
		return (
			<li><Link to="domain" params={{query: name}}>{name}</Link></li>
		)
	}
});
