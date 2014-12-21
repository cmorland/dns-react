var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var DomainBox = require('./components/domain/box.js');
var DomainForm = require('./components/domain/form.js');

var App = React.createClass({
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<div className="three columns">
						<div className="intro">
							<h1>DNS</h1>
							<p>Tools and ting!</p>

							<ul>
								<li><Link to="index">Home</Link></li>
								<li><Link to="domain">Domain</Link></li>
							</ul>
						</div>
					</div>
					<div className="nine columns">
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
		<DefaultRoute handler={Index} />
	</Route>
);

Router.run(routes, function(Handler, state) {
	var params = state.params;
	React.render(<Handler params={params} />, document.body);
});
