var React = require('react');

module.exports = React.createClass({
	propTypes: {
		primary: React.PropTypes.bool,
		text: React.PropTypes.string.isRequired,
		classes: React.PropTypes.string,
		handler: React.PropTypes.func,
		store: React.PropTypes.object,
		ns: React.PropTypes.string
	},
	getDefaultProps: function() {
		return {
			primary: false,
			handler: function() {}
		};
	},
	getInitialState: function() {
		return {
			loaded: true
		};
	},
	componentWillMount: function() {
		if (this.props.store && this.props.ns) {
			this.props.store.on(this.props.ns + '.error', this.error);
			this.props.store.on(this.props.ns + '.loaded', this.loaded);
		}
	},
	componentWillUnmount: function() {
		if (this.props.store && this.props.ns) {
			this.props.store.off(this.props.ns + '.error', this.error);
			this.props.store.off(this.props.ns + '.loaded', this.loaded);
		}
	},
	loaded: function() {
		this.setState({
			loaded: true
		});
	},
	error: function() {
		this.setState({
			loaded: true
		});
	},
	handler: function(e) {
		console.log('click');
		this.setState({
			loaded: false
		});
		this.props.handler(e);
	},
	render: function() {
		var classes = this.props.classes || '';
		classes += (this.props.primary) ? " button-primary" : " button";
		var text = this.props.text;
		if (!this.state.loaded) {
			classes += " loading";
			text = <i className="icon ion-ios-loop"></i>;
		}
		console.log(classes);
		return (
			<button className={classes} disabled={!this.state.loaded} onClick={this.handler} >
				{text}
			</button>
		)
	}
});
