import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import BackgroundSlider from "../Components/BackgroundSlider";
import "../Styles/Pages.RotisserieRoyale.scss";
import Footer from "../Components/Footer";
import $ from "jquery";
import BasicInput from "../Components/BasicInput";
import Axios from "axios";
import moment from "moment";

let backgroundImages = [
	{
		src: "/Assets/MinifiedImages/rr-slider-1-min.jpg"
	},
	{
		src: "/Assets/MinifiedImages/rr-slider-2-min.jpg"
	},
	{
		src: "/Assets/MinifiedImages/rr-slider-3-min.jpg"
	}
];

var translations = {
	perPerson: {
		de: "Pro Person",
		en: "Per person",
		fr: "Par personne"
	},
	correspondingWines: {
		de: "Auf Wunsch servieren wir Ihnen zu jedem Gang</br>ein Glas ausgesuchten Wein",
		en: "On request we can serve an </br>exquisite wine with every dish",
		fr: "Verre de vin aussocti à</br>chaque plat à la demande"
	},
	menuFor: {
		de: "Menü ab",
		en: "Menu from",
		fr: "Menu à partir de"
	},
	persons: {
		de: "Personen",
		en: "persons",
		fr: "personnes"
	},
	wineRecommendation: {
		de: "Unsere Weinempfehlung",
		en: "Our wine suggestion",
		fr: "Vin recommandés"
	}
};

class RotisserieRoyalePage extends Component {
	state = {
		inputValues: [],
		disabled: true,
		menu: [],
		page: 0,
		reservationNotification: ""
	};

	setInputValue = (name, value, valid) => {
		let inputValues = this.state.inputValues;
		let obj = inputValues.find(x => x.name === name);

		if (name === "tableReservationDate") {
			let validDay = new Date();
			validDay.setDate(validDay.getDate() + 1);
			let selectedDay = value;
			const t = this.props.t;
			if (moment(validDay, t("input.basic.dateFormat")).unix() < moment(selectedDay, t("input.basic.dateFormat")).unix()) {
				valid = true;
				if (this.state.reservationNotification === this.props.t("input.basic.dateTooEarly")) {
					this.setState({
						reservationNotification: ""
					});
				}
			} else {
				valid = false;
				this.setState({
					reservationNotification: this.props.t("input.basic.dateTooEarly")
				});
			}
		}

		if (name === "tableReservationNum") {
			if (value > 6) {
				valid = false;
				this.setState({
					reservationNotification: this.props.t("input.basic.tooManyPeople")
				});
			} else {
				if (this.state.reservationNotification === this.props.t("input.basic.tooManyPeople")) {
					this.setState({
						reservationNotification: ""
					});
				}
			}
		}

		if (obj) {
			obj.valid = valid;
			obj.value = value;
		} else {
			obj = {
				name,
				valid,
				value
			};
			inputValues.push(obj);
		}

		this.setState(
			{
				inputValues
			},
			this.checkValidationStatus
		);
	};
	checkValidationStatus = () => {
		let valid = true;
		this.state.inputValues.forEach(element => {
			if (element.valid === false) {
				valid = false;
			}
		});
		this.setState({
			disabled: !valid
		});
		return valid;
	};

	componentDidMount = () => {
		this.loadDishes();
	};
	loadDishes = () => {
		Axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + "/cardDesigner/completeCard/" + process.env.REACT_APP_MASTER_CARD_ID).then(
			response => {
				this.setState({ menu: response.data.filter(page => page.id !== "64476b58-e956-a7cd-a96e-218f7e0967d5") });
			}
		);
	};
	selectPage = type => {
		let page = this.state.page;
		let maxPage = this.state.menu.length - 1;
		if (type === "next") {
			if (page < maxPage) {
				page++;
			} else {
				page = 0;
			}
		} else {
			if (page > 0) {
				page--;
			} else {
				page = maxPage;
			}
		}
		this.setState({
			page
		});
	};

	sendTableReservationRequest = e => {
		e.preventDefault();
		if (this.checkValidationStatus()) {
			$(".table-reservation input, .table-reservation textarea").each((index, element) => {
				element.value = "";
			});
			let content = {
				language: window.lang,
				inputVal: {}
			};
			this.state.inputValues
				.filter(input => input.name.indexOf("tableReservation") === 0)
				.forEach(inputVal => {
					content.inputVal[inputVal.name] = inputVal.value;
				});

			window.store.dispatch({ type: "TOGGLE_POPUP", name: "responseMessage" });
			Axios.post(process.env.REACT_APP_BACKEND_ENDPOINT + "/contactRequest/table_request", content).then(function(response) {
				setTimeout(function() {
					window.store.dispatch({ type: "REQUEST_FINISHED", name: "responseMessage", response: response.data.message });
				}, 1000);
			});
		}
	};

	getDishName = dish => {
		var name = dish.name.replace("\n", "<br>");

		name += "<sup>" + dish.numbers.toString() + "</sup>";

		return name;
	};

	render() {
		const { t } = this.props;
		let { menu, page } = this.state;
		return (
			<div className="RotisserieRoyalePage">
				<BackgroundSlider images={backgroundImages} autoplay={true} />
				<div id="logo">
					<a href="/">
						<img alt="Logo - Rotisserie Royale / Gästehaus am Schlossberg" src="/Assets/Slider/logo.png" />
					</a>
				</div>
				<div className="main-content">
					<section className="content">
						<h1 dangerouslySetInnerHTML={{ __html: t("pages.rr.welcome_h1") }} />
						<h2>
							<span className="float-left not-mobile" />
							{t("pages.rr.welcome_h2")}
							<span className="float-right not-mobile" />
						</h2>
						<div className="flex-center">
							<article className="small-content big-capital">
								<p>
									<span className="bigLetter">{t("pages.rr.text_first_letter")}</span>
									{t("pages.rr.text")}
								</p>
							</article>
							<article className="text-center small-content">
								<img src="/Assets/MinifiedImages/rr-1-min.jpg" alt={t("pages.rr.img_alt")} />
								<h1>{t("pages.rr.kitchen_ours.h1")}</h1>
								<p>{t("pages.rr.kitchen_ours.first")}</p>
								<p>{t("pages.rr.kitchen_ours.second")}</p>
								<p className="bold">{t("pages.rr.kitchen_ours.free_day")}</p>
							</article>
						</div>
						<div className="flex-center">
							<article id="menu-card" className="menu-card">
								<h1>{t("pages.rr.menu_card")}</h1>
								<div className="menu-items">
									{menu[page] &&
										menu[page].cards.map(card => (
											<div key={card.id} className={card.type === "menu" ? "menu-item" : "menu-item standard-menu"}>
												<div className="menuCardInfoHead">
													<h2>{card.name[window.lang]}</h2>
												</div>
												<div className="menuCardContent">
													{card.cardItems.map((item, index) => (
														<div key={item.id}>
															<div className={card.type === "menu" ? "menu-dish" : "standard-dish"}>
																<div className="dish-info">
																	<div
																		className="dish-name"
																		dangerouslySetInnerHTML={{
																			__html: item.name[window.lang].replace(
																				/(?:\r\n|\r|\n)/g,
																				"</br>"
																			)
																		}}
																	/>
																</div>
																{card.type !== "menu" && (
																	<div className="dish-price">
																		{item.prices[0].price.toFixed(2).replace(".", ",")} €
																	</div>
																)}
															</div>
															{index < card.cardItems.length - 1 && (
																<p className="dish-divide">
																	<svg height="12" width="300">
																		<path d="M 0 6 C 140 6 140 6 150 0 C 160 6 160 6 300 6 C 160 6 160 6 150 12 C 140 6 140 6 0 6 Z" />
																	</svg>
																</p>
															)}
														</div>
													))}
													{card.type === "menu" && card.options && (
														<div className="menuCard-price">
															<div className="price">
																{card.options.price && card.options.price.enabled && (
																	<>
																		{translations.perPerson[window.lang]}{" "}
																		<span className="mainPrice">
																			{card.options.price.value.toFixed(2).replace(".", ",")}
																		</span>
																		€
																		<br />
																	</>
																)}
																{card.options.minPersons && card.options.minPersons.enabled && (
																	<div className="minPersonsDiv">
																		{translations.menuFor[window.lang]}{" "}
																		<span className="minPersons">
																			{card.options.minPersons.value || 0}
																		</span>{" "}
																		{translations.persons[window.lang]}
																	</div>
																)}
															</div>
														</div>
													)}

													{card.options &&
														card.options["corresponding-wines"] &&
														card.options["corresponding-wines"].enabled && (
															<div className="menuCard-correspondingWines">
																<span
																	dangerouslySetInnerHTML={{
																		__html: translations.correspondingWines[window.lang]
																	}}
																/>{" "}
																<br />
																<div className="price">
																	{translations.perPerson[window.lang]}{" "}
																	<span className="correspondingWinesPrice">
																		{card.options["corresponding-wines"].value
																			.toFixed(2)
																			.replace(".", ",")}
																	</span>
																	€
																</div>
															</div>
														)}
													{card.options &&
														card.options["wine-recommendation"] &&
														card.options["wine-recommendation"].enabled && (
															<div className="menuCard-wineRecommendation">
																<div className="headding">
																	{translations.wineRecommendation[window.lang]}
																</div>
																<div
																	className="wineRecommendation"
																	dangerouslySetInnerHTML={{
																		__html: card.options["wine-recommendation"].value.name[window.lang]
																	}}
																/>
															</div>
														)}
													{card.options && card.options.additionalText && card.options.additionalText.enabled && (
														<div
															className="menuCard-additionalText"
															dangerouslySetInnerHTML={{
																__html: card.options.additionalText.value.name[window.lang].replace(
																	/(?:\r\n|\r|\n)/g,
																	"</br>"
																)
															}}
														/>
													)}
												</div>
											</div>
										))}
									<div className="menu-background" />
									<div className="menu-card-controls">
										<button type="button" className="slick-arrow slick-prev" onClick={() => this.selectPage("prev")}>
											Previous
										</button>
										<button type="button" className="slick-arrow slick-next" onClick={() => this.selectPage("next")}>
											Next
										</button>
									</div>
								</div>
							</article>
						</div>
						<div className="flex-center">
							<article id="table-reservation" className="table-reservation middle-content basicInput">
								<h1>{t("pages.rr.table_reservation")}</h1>
								<form onSubmit={this.sendTableReservationRequest}>
									<fieldset>
										<BasicInput
											type="text"
											name="tableReservationName"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.name")}
										/>
										<BasicInput
											type="text"
											name="tableReservationStreet"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.street")}
										/>
										<BasicInput
											type="number"
											name="tableReservationPLZ"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.plz")}
										/>
										<BasicInput
											type="text"
											name="tableReservationCity"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.city")}
										/>
										<BasicInput
											type="tel"
											name="tableReservationPhone"
											setValue={this.setInputValue}
											placeholder={t("input.basic.phone")}
										/>
										<BasicInput
											type="email"
											name="tableReservationEmail"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.email")}
										/>
									</fieldset>
									<fieldset>
										<BasicInput
											type="date"
											dateFormat={t("input.basic.dateFormat")}
											name="tableReservationDate"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.date")}
										/>
										<BasicInput
											type="time"
											name="tableReservationTime"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.time")}
										/>
										<BasicInput
											type="number"
											name="tableReservationNum"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.num_pers")}
										/>
										<BasicInput
											type="textarea"
											name="tableReservationAdditionalMessage"
											setValue={this.setInputValue}
											placeholder={t("input.basic.additional_info")}
										/>
										{this.state.reservationNotification.length > 0 && (
											<div className="form-notification">{this.state.reservationNotification}</div>
										)}

										<button className="btn" disabled={this.state.disabled}>
											{t("input.basic.table_reservation")}
										</button>
									</fieldset>
								</form>
							</article>
						</div>
					</section>
					<Footer />
				</div>
			</div>
		);
	}
}

export default withTranslation()(RotisserieRoyalePage);
