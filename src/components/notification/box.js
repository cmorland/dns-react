var React = require('react');
var Form = require('../form.js');
var List = require('./list.js');
var Store = require('./store.js');
var Table = require('./table.js');
var Actions = require('./actions.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			result: Store.getResults(),
		};
	},
	componentWillMount: function () {
		Store.onAny(this.changeState);
		Actions.query()
	},
	componentWillUnmount: function () {
		Store.offAny(this.changeState);
	},
	changeState: function () {
		this.setState({
			result: Store.getResults()
		});
	},
	addWatcher: function(e) {
		e.preventDefault();
		var notification = {
			name: this.refs.name.getDOMNode().value.trim(),
			interval: this.refs.interval.getDOMNode().value.trim()
		};
		Actions.add(notification);
	},
	render: function() {
		return (
			<div>
				<Form message="Search notifications" store={Store} ns="notification" placeholder="example.com" action={Actions.query} />
				<label>Add Watcher</label>
				<div className="block">
					<form onSubmit={this.addWatcher}>
						<div className="row">
							<div className="one-third column">
								<input className="u-full-width" type="text" name="name" ref="name" placeholder="example.com" />
							</div>
							<div className="one-third column">
								<input className="u-full-width" type="text" name="interval" ref="interval" placeholder="@every 1d2h3m" />
							</div>
							<div className="one-third column">
								<button className="u-full-width" type="submit">Add</button>
							</div>
						</div>
					</form>
				</div>
				<br />
				<Table data={this.state.result} />
			</div>
		);
	}
});
