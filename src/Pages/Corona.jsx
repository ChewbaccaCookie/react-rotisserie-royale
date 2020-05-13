import React, { Component } from "react";
import Div100vh from "react-div-100vh";
import { Form, Select, Input, Button } from "@onedash/tools";
import "../Styles/Pages.Corona.scss";
import Axios from "axios";
import PopupUtils from "../Utils/PopupUtils";
import SocialDistancing from "./social-distancing.png";

export default class Corona extends Component {
	form = React.createRef();
	state = {
		step: 1,
		inputStep: 1,
		houseHolds: 0,
		houseMembers: {
			1: 2,
			2: 2,
		},
		tables: undefined,
		tableStates: undefined,
		tableBlocked: false,
	};

	nextStep = () => {
		this.setState({
			step: this.state.step + 1,
		});
	};
	componentDidMount() {
		this.loadTables();
	}

	classInputStep = (num) => {
		return this.state.inputStep >= num ? "input-step visible" : "input-step";
	};
	classHouseholds = (num) => {
		return this.state.houseHolds === num ? "num-households active" : "num-households";
	};
	classHouseMembers = (house, num) => {
		return this.state.houseMembers[house] === num ? "num-house-member active" : "num-house-member";
	};

	setHouseholds = (num) => {
		this.setState({ houseHolds: num });
		if (this.state.inputStep === 2) {
			this.setState({ inputStep: 3 });
		}
		this.updateFormValidation();
	};
	setHouseMembers = (house, num) => {
		const houseMembers = this.state.houseMembers;
		houseMembers[house] = num;
		this.setState({ houseMembers });
		this.updateFormValidation();
	};

	updateFormValidation = () => {
		if (this.form.current) {
			setTimeout(() => {
				this.form.current.validateSubmitBtn();
				this.form.current.resetValidation();
			});
		}
	};

	sendData = async (data, form) => {
		let sendData = { houseHolds: [] };
		// Format data for db store
		Object.keys(data).forEach((property) => {
			if (property.indexOf("household") !== -1) {
				let num = Number(property.split("household-")[1].charAt(0)) - 1;
				let houseProp = property.split("household-")[1].substr(2);

				if (property.indexOf("member") === -1) {
					if (!sendData.houseHolds) sendData.houseHolds = [];
					if (!sendData.houseHolds[num]) sendData.houseHolds[num] = {};
					sendData.houseHolds[num][houseProp] = data[property];
				} else {
					if (!sendData.houseHolds[num].members) sendData.houseHolds[num].members = [];
					sendData.houseHolds[num].members.push(data[property]);
				}
			} else {
				sendData[property] = data[property];
			}
		});
		sendData.people = this.state.houseHolds === 2 ? this.state.houseMembers[1] + this.state.houseMembers[2] : this.state.houseMembers[1];

		PopupUtils.showPopup("responseMessage");
		const response = await Axios.post(process.env.REACT_APP_NEW_BACKEND_ENDPOINT + "/gastro/corona", sendData);
		if (response.status === 200) {
			PopupUtils.setResponseMessage("Ihre Daten wurden erfolgreich gespeichert.<br/>Vielen Dank für Ihre Mithilfe! ", "/");
		}
	};

	loadTables = async () => {
		const response = await Axios.get(process.env.REACT_APP_NEW_BACKEND_ENDPOINT + "/gastro/corona");

		const tables = [];
		response.data.data.forEach((t) => {
			tables.push({
				label: t.name,
				value: t.table,
			});
		});
		this.setState(
			{
				tables,
				tableStates: response.data.data,
			},
			() => {
				const table = this.props.match.params.tableNum;

				if (table && tables.find((x) => x.value === Number(table))) {
					this.selectTable({ value: Number(table) });
				}
			}
		);
	};

	selectTable = (obj) => {
		const table = this.state.tableStates.find((x) => x.table === obj.value);
		if (!table) return;
		if (table.status === "blocked") {
			this.setState({
				table: obj.value,
				tableBlocked: true,
			});

			return;
		}
		this.setState({ table: obj.value, inputStep: 2, tableBlocked: false });
	};

	render() {
		const step = this.state.step;
		return (
			<Div100vh className="corona">
				<div className={`image-container step-${step}`}>
					<img alt="Social Distancing" height="100%" className="title-image" src={SocialDistancing} />

					<h1 className="left-title">#Flattenthecurve</h1>
				</div>

				<div className={`steps step-${step}`}>
					<div className="step">
						<p>
							Aufgrund der sechsten{" "}
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://corona.rlp.de/fileadmin/rlp-stk/pdf-Dateien/Corona/6._CoBeLVO_.pdf"
							>
								Corona-Bekämpfungsverordnung Rheinland-Pfalz
							</a>{" "}
							sind wir verpflichtet die Kontaktdaten aller unserer Gäste zu erfassen.
						</p>
						<button onClick={this.nextStep} className="submit-button">
							<p>Weiter</p>
							<img className="title-image" src="/Assets/Images/arrow.svg" alt="Weiter zum nächsten Schritt" />
						</button>
					</div>
					<div className="step">
						<p>
							Ihre Daten werden einen Monat aufbewahrt und auf Anordnung des Gesundheitsamtes diesem zur Verfügung gestellt. Die Daten
							werden <span className="bold underline">nicht</span> anderweitig verwendet.
						</p>
						<button onClick={this.nextStep} className="submit-button">
							<p>Akzeptieren</p>
							<img className="title-image" src="/Assets/Images/arrow.svg" alt="Weiter zum nächsten Schritt" />
						</button>
					</div>

					<div className="step">
						<h1>Dateneingabe</h1>
						<Form
							ref={this.form}
							onSubmit={this.sendData}
							className={`input-step-${this.state.inputStep}`}
							validateOnSubmit
							submitText="Daten absenden"
						>
							<div className={this.classInputStep(1)}>
								<h2>1. Ihr Tisch</h2>
								<div className="inputs">
									<Select
										onChange={this.selectTable}
										name="table"
										value={this.state.table}
										native
										options={this.state.tables}
										required
										disabled={this.state.table !== undefined ? true : false}
										label="An welchem Tisch sitzen Sie?"
									></Select>
									{this.state.tableBlocked === true && (
										<div className="select-message">
											Dieser Tisch ist aktuell noch belegt. Bitten Sie eine Servicekraft diesen Sitzplatz wieder freizuschalten.
											<Button className="visible" onClick={this.loadTables}>
												Aktualisieren
											</Button>
										</div>
									)}
								</div>
							</div>
							<div className={this.classInputStep(2)}>
								<h2>2. Anzahl der Haushalte</h2>
								<div className="inputs">
									<button type="button" className={this.classHouseholds(1)} onClick={() => this.setHouseholds(1)}>
										1
									</button>
									<button type="button" className={this.classHouseholds(2)} onClick={() => this.setHouseholds(2)}>
										2
									</button>
								</div>
							</div>
							<div className={this.classInputStep(3)}>
								{[...Array(this.state.houseHolds)].map((x, i) => (
									<React.Fragment key={i}>
										<h2>
											{3 + i}. {i === 0 ? "Erster" : "Zweiter"} Haushalt
										</h2>
										<div className="inputs">
											<Input name={`household-${i + 1}-name`} autoComplete="name" required type="text" label="Name" />
											<Input
												name={`household-${i + 1}-street`}
												autoComplete="street-address"
												required
												type="text"
												label="Straße"
											/>
											<Input
												name={`household-${i + 1}-plz`}
												autoComplete="postal-code"
												required
												type="text"
												label="Postleitzahl"
											/>
											<Input
												name={`household-${i + 1}-address`}
												autoComplete="address-level2"
												required
												type="text"
												label="Ort"
											/>
											<Input name={`household-${i + 1}-phone`} autoComplete="tel" type="tel" required label="Telefonnummer" />
											<div className="member-entry">
												<h3>Anzahl der Anwohner dieses Haushalts</h3>
												{[...Array(6)].map((x, ii) => (
													<button
														type="button"
														key={ii}
														className={this.classHouseMembers(i + 1, ii + 1)}
														onClick={(e) => {
															this.setHouseMembers(i + 1, ii + 1);
															e.preventDefault();
														}}
													>
														{ii + 1}
													</button>
												))}
												<div className="members">
													{[...Array(this.state.houseMembers[i + 1] - 1)].map((x, ii) => (
														<Input
															key={ii}
															autoComplete="off"
															required
															type="text"
															label={`Name des ${ii + 2}. Anwohners`}
															name={`household-${i + 1}-member-${ii + 1}`}
														/>
													))}
												</div>
											</div>
										</div>
									</React.Fragment>
								))}
							</div>
						</Form>
					</div>
				</div>
			</Div100vh>
		);
	}
}
