var React = require('react');
var moment = require('moment');

module.exports = React.createClass({
	render: function() {
		var whois = this.props.data;
		if ($.isEmptyObject(whois)) {
			return null;
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
				contacts.push(
					<tr>
						<td></td>
						<th>{what}</th>
						<td>{val}</td>
					</tr>
				);
			});
		});

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
							<td>{whois.data.id.join("\n")}</td>
							<td>{whois.data.registrar.join("\n")}</td>
							<td>{whois.data.status.join("\n")}</td>
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
