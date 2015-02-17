var React = require('react');
var Actions = require('./actions.js');
var Store = require('./store.js');
var Navigation = require('react-router').Navigation;

module.exports = React.createClass({
	mixins: [Navigation],
	componentWillMount: function() {
		Store.on('auth.done', this.loggedIn);
	},
	componentWillUnmount: function() {
		Store.off('auth.done', this.loggedIn);
	},
	onSubmit: function(e) {
		e.preventDefault();
		var u = this.refs.username.getDOMNode().value.trim();
		var p = this.refs.password.getDOMNode().value.trim();
		Actions.auth(u, p);
	},
	loggedIn: function() {
		this.transitionTo("index");
	},
	render: function() {
		return (
			<div className="container" id="login">
			<form onSubmit={this.onSubmit}>
		<div className="row">
			<div className="one-third column>"></div>
			<div className="two-thirds column">
				<h1 className="u-text-center">DNS</h1>
				<label>Email</label>
				<input className="u-full-width" type="text" name="username" placeholder="your@email.com" ref="username" />
				<label>Password</label>
				<input className="u-full-width" type="password" name="password" placeholder="password" ref="password" />
				<hr />
				<input className="u-full-width button-primary" type="submit" value="Login" />
			</div>
		</div>
	</form>
		</div>
		)
	}
});
