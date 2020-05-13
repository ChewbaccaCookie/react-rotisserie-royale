import React, { Component } from "react";

import "../Styles/Pages.ManageCorona.scss";
import Axios from "axios";

export default class ManageCorona extends Component {
	state = {
		tables: [],
	};
	loadTables = async () => {
		const response = await Axios.get(process.env.REACT_APP_NEW_BACKEND_ENDPOINT + "/gastro/corona");
		this.setState({
			tables: response.data.data,
		});
	};
	componentDidMount() {
		// Sync each 5 seconds;
		setInterval(this.loadTables, 5000);
		this.loadTables();
	}

	togglePlace = (table) => {
		const tables = this.state.tables;
		const t = tables.find((x) => x.table === table);
		if (!t || t.status === "free") return;
		t.status = "free";
		this.setState({ tables });
		Axios.put(process.env.REACT_APP_NEW_BACKEND_ENDPOINT + "/gastro/corona", { table });
	};

	render() {
		return (
			<div className="manage-corona">
				<h1>Manage Tables</h1>
				<div className="tables">
					{this.state.tables.map((table) => (
						<div className="table" key={table.table}>
							<div className="info">
								<p className="name">{table.name}</p>
								<p className="people">
									{table.people !== 0 ? table.people : undefined} {table.people > 0 && (table.people === 1 ? "Person" : "Personen")}
								</p>
							</div>
							<button onClick={() => this.togglePlace(table.table)} className={table.status === "blocked" ? "blocked" : "free"}>
								{table.status === "blocked" ? "Belegt" : "Frei"}
							</button>
						</div>
					))}
				</div>
			</div>
		);
	}
}
