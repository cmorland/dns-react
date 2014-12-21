var React = require('react');
var DomainBox = require('./components/domain/box.js');
var DomainForm = require('./components/domain/form.js');

React.render(
	<DomainForm />,
	document.getElementById('domainForm')
);
React.render(
	<DomainBox />,
	document.getElementById('domain')
);
