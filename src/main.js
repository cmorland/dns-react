var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var DomainBox = require('./components/domain/box.js');
var EmailBox = require('./components/email/box.js');
var WhoisBox = require('./components/whois/box.js');
var DomainForm = require('./components/domain/form.js');

var App = React.createClass({
	render: function() {
		return (
			<div className="container" id="main">
				<div className="row">
					<div className="two columns" id="nav">
						<div className="intro">
							<h1>DNS</h1>
							<p>Tools and ting!</p>

							<ul>
								<li><Link to="index">Home</Link></li>
								<li><Link to="domain">Domain</Link></li>
								<li><Link to="whois">Whois</Link></li>
								<li><Link to="email">Email</Link></li>
							</ul>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="two columns"><p></p></div>
					<div className="ten columns">
						<RouteHandler {...this.props} />
					</div>
				</div>
			</div>

		)
	}
});

var Index = React.createClass({
	render: function() {
		return (
			<h2>HELLO</h2>
		)
	}
});

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="index" handler={Index} />
		<Route name="domain" path="domain/?:query?" handler={DomainBox} />
		<Route name="whois" path="whois/?:query?" handler={WhoisBox} />
		<Route name="email" path="email/?:query?" handler={EmailBox} />
		<DefaultRoute handler={Index} />
	</Route>
);

Router.run(routes, function(Handler, state) {
	var params = state.params;
	React.render(<Handler params={params} />, document.body);
});
