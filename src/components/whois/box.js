var React = require('react');
var Form = require('./form.js');
var List = require('./list.js');
var Store = require('./store.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			results: Store.getResults(),
		};
	},
	componentWillMount: function () {
		Store.onAny(this.changeState);
	},
	componentWillUnmount: function () {
		Store.offAny(this.changeState);
	},
	changeState: function () {
		this.setState({
			results: Store.getResults()
		});
	},
	render: function() {
		return (
			<div className="domainBox">
				<div className="row">
					<div className="one-third column">
						<h3></h3>
						<p>Perform a domain query.</p>
						<Form />
					</div>
					<div className="two-thirds column">
						<h6>Recent Queries</h6>
						<List data={this.state.results} />
					</div>
				</div>
			</div>
		);
	}
});
