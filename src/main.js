var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var Transition = Router.Transition;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var DomainBox = require('./components/domain/box.js');
var EmailBox = require('./components/email/box.js');
var WhoisBox = require('./components/whois/box.js');
var WatcherBox = require('./components/watcher/box.js');
var LoginBox = require('./components/auth/box.js');
var AuthStore = require('./components/auth/store.js');
var DiffBox = require('./components/diff/box.js');

var App = React.createClass({
	render: function() {
		var menuClass = "two columns slide-left";
		if (!AuthStore.LoggedIn()) {
			menuClass += " hidden";
		} else {
			menuClass += " show";
		}
		return (
			<div>
				<div className={menuClass} id="nav">
					<div className="intro">
						<h4>DNS</h4>
						<ul>
							<li className="section">My</li>
							<li><Link to="index">Dashboard</Link></li>
							<li className="section">Lookup</li>
							<li><Link to="domain">Domain</Link></li>
							<li><Link to="whois">Whois</Link></li>
							<li><Link to="email">Email</Link></li>
							<li className="section">Tools</li>
							<li><Link to="watcher">Watcher</Link></li>
						</ul>
					</div>
				</div>
				<div className="container" id="main">
					<div className="row">
						<div className="twelve columns">
							<RouteHandler {...this.props} />
						</div>
					</div>
				</div>
			</div>

		)
	}
});

var NotificationTable = require('./components/notification/table.js');
var NotificationStore = require('./components/notification/store.js');
var WatcherTable = require('./components/watcher/table.js');
var WatcherStore = require('./components/watcher/store.js');
var WatcherActions = require('./components/watcher/actions.js');
var Index = React.createClass({
	componentWillMount: function() {
		NotificationStore.onAny(this.changeState)
		NotificationStore.Query({
			orderBy: "messages->>'added'",
			order: 'desc'
		});
		WatcherStore.onAny(this.changeState)
		WatcherActions.query({'user': AuthStore.Username() });
	},
	componentWillUnmount: function() {
		//NotificationStore.offAny(this.changeState)
		WatcherStore.offAny(this.changeState)
	},
	changeState: function () {
		this.setState({});
	},
	render: function() {
		return (
			<div>
				<div className="block">
					<h5>Notifications</h5>
					<NotificationTable data={NotificationStore.GetResults()} />
				</div>
				<div className="block">
					<h5>My Watches</h5>
					<WatcherTable data={WatcherStore.getResults()} />
				</div>
			</div>
		)
	}
});

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="index" handler={Index} />
		<Route name="domain" path="domain/?:query?" handler={DomainBox} />
		<Route name="whois" path="whois/?:query?" handler={WhoisBox} />
		<Route name="watcher" path="watcher/?:query?" handler={WatcherBox} />
		<Route name="email" path="email/?:query?" handler={EmailBox} />
		<Route name="login" path="login" handler={LoginBox} />
		<Route name="diff" path="diff/:domain" handler={DiffBox} />
		<DefaultRoute handler={Index} />
	</Route>
);

AuthStore.CheckLogin(function() {
	Router.run(routes, function(Handler, state) {
		console.log(AuthStore.LoggedIn());
		if (state.pathname == "/login" || AuthStore.LoggedIn() == true) {
			var params = state.params;
			React.render(<Handler params={params} />, document.body);
		} else {
			Handler.transitionTo("login");
		}
	});
});


