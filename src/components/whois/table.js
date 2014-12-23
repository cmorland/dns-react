var React = require('react');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
	render: function() {
		var whois = this.props.data;
		if ($.isEmptyObject(whois)) {
			return (
				<p>No Whois information at present.</p>
			)
		}

		if (this.props.raw) {
			return (
				<pre>
					<code>{whois.raw}</code>
				</pre>
			)
		}

		var added = moment(whois.added).format('DD-MM-YYYY');
		var creationDate = moment(whois.creation_date).format('DD-MM-YYYY');
		var expirationDate = moment(whois.expiration_date).format('DD-MM-YYYY');
		var updatedDate = moment(whois.updated_date).format('DD-MM-YYYY');

		var contacts = [];
		$.each(whois.contacts, function(i, contact) {
			var who = i[0].toUpperCase() + i.slice(1);
			contacts.push(
				<tr>
					<th colSpan="3">{who}</th>
				</tr>
			);
			$.each(contact, function(j, val) {
				var what = j[0].toUpperCase() + j.slice(1);
				if (j == "email") {
					val = <Link to="email" params={{query: val}}>{val}</Link>
				}
				contacts.push(
					<tr>
						<td></td>
						<th>{what}</th>
						<td>{val}</td>
					</tr>
				);
			});
		});

		var id = whois.data.id;
		if (id && id.length > 0) {
			id = id.join("\n");
		}
		var registrar = whois.data.registrar;
		if (registrar && registrar.length > 0) {
			registrar = registrar.join("\n");
		}
		var status = whois.data.status;
		if (status && status.length > 0) {
			status = status.join("\n");
		}

		return (
			<div>
				<table className="u-full-width">
					<thead>
						<tr>
							<th>ID</th>
							<th>Registrar</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{id}</td>
							<td>{registrar}</td>
							<td>{status}</td>
						</tr>
					</tbody>
				</table>

				<table className="u-full-width">
					<thead>
						<tr>
							<th colSpan="3">Nameservers</th>
						</tr>
					</thead>
					<tbody>
						{
							whois.data.nameservers.map(function(ns, i) {
								i++;
								return(
									<tr>
										<th>#{i}</th>
										<td colSpan="2">{ns}</td>
									</tr>
									)
							})
						}
					</tbody>
				</table>

				<table className="u-full-width">
					<thead>
						<tr>
							<th colSpan="3">Contacts</th>
						</tr>
					</thead>
					<tbody>
						{contacts}
					</tbody>
				</table>

				<table className="u-full-width">
					<thead>
						<tr>
							<th>Added</th>
							<th>Creation</th>
							<th>Expiration</th>
							<th>Updated</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{added}</td>
							<td>{creationDate}</td>
							<td>{expirationDate}</td>
							<td>{updatedDate}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
});
