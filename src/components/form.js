var React = require('react');

module.exports = React.createClass({
	propTypes: {
		action: React.PropTypes.func.isRequired,
		placeholder: React.PropTypes.string.isRequired,
		message: React.PropTypes.string.isRequired,
		ns: React.PropTypes.string.isRequired,
		store: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			error: '',
			loaded: true
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var query = this.refs.query.getDOMNode().value.trim();
		if (!query) { 
			return;
		}
		this.props.action(query);
		this.errorReset();
	},
	componentWillMount: function() {
		this.props.store.on(this.props.ns + '.error', this.error);
		this.props.store.on(this.props.ns + '.loaded', this.loaded);
	},
	componentWillUnmount: function() {
		this.props.store.off(this.props.ns + '.error', this.error);
		this.props.store.off(this.props.ns + '.loaded', this.loaded);
	},
	loaded: function() {
		this.setState({
			loaded: true
		})
	},
	error: function(err) {
		this.setState({
			error: err,
			loaded: true
		});
	},
	errorReset: function() {
		this.setState({
			error: '',
			loaded: false
		});
	},
	render: function() {
		var loaded = "searchSubmit";
		var buttonText = "Search";
		if (!this.state.loaded) {
			loaded = "searchSubmit loading";
			buttonText = <i className="icon ion-ios-loop"></i>;
		}
		var error = null;
		if (this.state.error) {
			error = <p>{this.state.error}</p>
		}
		return (
			<div className="block">
				<label>{this.props.message}</label>
				<form onSubmit={this.handleSubmit}>
					<input className="searchBar u-pull-left" type="text" placeholder={this.props.placeholder} ref="query" />
					<button className={loaded} type="submit" disabled={!this.state.loaded}>
						{buttonText}
					</button>
				</form>
				{error}
			</div>
		);
	}
});
