var React = require('react');
var Store = require('./store.js');
var Actions = require('./actions.js');
var WhoisTable = require('../whois/table.js');
var moment = require('moment');
var difflib = require('jsdifflib');


module.exports = React.createClass({
	getInitialState: function() {
		return {
			index: 0
		}
	},
	componentWillMount: function () {
		Store.on('diff.getbydomain.loaded', this.loaded);
		Actions.getByDomain(this.props.params.domain);
	},
	componentWillUnmount: function () {
		Store.off('diff.getbydomain.loaded', this.loaded);
	},
	loaded: function() {
		this.setState({});
	},
	next: function() {
		var index = this.state.index;
		var len = Store.GetByDomain().length;
		if (index < (len - 2)) {
			index++;
		}
		this.setState({
			index: index,
		});
	},
	previous: function() {
		var index = this.state.index;
		if (index > 0) {
			index--;
		}
		this.setState({
			index: index,
		});
	},
	render: function() {
		var rows = null;
		var results = Store.GetByDomain();
		if (results.length > 0) {
			var a = results[this.state.index];
			var b = results[this.state.index+1];
			var aAdded = moment(a.added).format("YYYY-MM-DD");
			var bAdded = moment(b.added).format("YYYY-MM-DD");
			a = a.raw[0];
			b = b.raw[0];
			var base = difflib.stringAsLines(a);
			var newtxt = difflib.stringAsLines(b);
			var sm = new difflib.SequenceMatcher(base, newtxt);
			var opcodes = sm.get_opcodes();
			var diffoutputdiv = this.refs.output.getDOMNode().childNodes[0];
			while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
			diffoutputdiv.appendChild(diffview.buildView({
				baseTextLines: base,
				newTextLines: newtxt,
				opcodes: opcodes,
				// set the display titles for each resource
				baseTextName: aAdded,
				newTextName: bAdded,
				contextSize: null,
				viewType: 0
			}));
		}
		var next = null;
		if (this.state.index < results.length - 2) {
			next = <button className="u-pull-right small button" onClick={this.next}>Next</button>;
		}
		var prev = null;
		if (this.state.index > 0) {
			prev = <button className="u-pull-left small button" onClick={this.previous}>Previous</button>;
		}
		return (
			<div>
				<span id="fixReactRouterIssueWithRefs" ref="dummy" />
				{prev}
				{next}
				<div className="u-cf"></div>
				<div className="u-full-width" ref="output">
					<div></div>
				</div>
			</div>
		)
	}
});
