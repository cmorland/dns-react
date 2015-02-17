var flux = require('flux-react');
var actions = require('./actions.js');

function getHash(username, password) {
	var hash = username + ":" + password
	hash = btoa(unescape(encodeURIComponent(hash)));
	return hash;
}

function login(hash) {
	$.ajaxSetup({
		headers: {
			'Authorization': 'Basic ' + hash
		}
	});
}

module.exports = flux.createStore({
	loggedIn: false,
	actions: [
		actions.auth
	],
	auth: function(u, p) {
		var hash = getHash(u, p);
		var self = this;
		$.get("/api/v1/auth/?hash="+hash)
		.done(function(data) {
			console.log('auth done');
			login(hash);
			self.emit('auth.done');
			self.loggedIn = true;
		})
		.fail(function(data) {
			console.log('auth fail');
		});
	},
	exports: {
		LoggedIn: function() {
			return this.loggedIn;
		},
		CheckLogin: function(fn) {
			var self = this;
			$.get("/api/v1/auth/?check=1")
			.done(function(data, textStatus, request) {
				var expires = request.getResponseHeader('X-Expires');
				if (expires) {
					console.log('woooo');
					self.loggedIn = true;
				}
				fn();
			})
			.fail(function() {
				fn();
			});
		}
	}
});

