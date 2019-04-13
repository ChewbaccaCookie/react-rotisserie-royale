import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import BackgroundSlider from "../Components/BackgroundSlider";
import "../Styles/Pages.RotisserieRoyale.scss";
import Footer from "../Components/Footer";
import $ from "jquery";
import BasicInput from "../Components/BasicInput";
import Axios from "axios";
import mainSettings from "../MainSettings";

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
	contains: {
		de: "Enthält:",
		en: "Contains:",
		fr: "Contient:"
	},
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
		page: 0
	};

	setInputValue = (name, value, valid) => {
		let inputValues = this.state.inputValues;
		let obj = inputValues.find(x => x.name === name);

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
	convertToFormat = () => {
		let dishes = this.state.dishes;
		let menuCards = [];
		let internalFormat = [];
		dishes.map(dish => {
			if (dish.type === "info" && !menuCards.includes(dish.elementId)) {
				menuCards.push(dish.elementId);
			}
			return 0;
		});

		menuCards.forEach(card => {
			let content = dishes.filter(x => x.menuCard === card && x.type === "dish");

			content.sort((a, b) => {
				return a.order - b.order;
			});

			let el = {
				content,
				info: dishes.find(x => x.elementId === card && x.type === "info")
			};
			internalFormat.push(el);
		});

		internalFormat.sort(function(a, b) {
			return a.info.order - b.info.order;
		});

		let currentSiteNum = 0;
		let page = 0;
		internalFormat.forEach(card => {
			if (window.innerWidth > 720) {
				if (card.content.length + currentSiteNum > 10) {
					page++;
					currentSiteNum = 0;
				}

				currentSiteNum += card.content.length;
				if (card.info.isMenuCard) {
					currentSiteNum = 100;
				}
				card.page = page;
			} else {
				card.page = page;
				page++;
			}
		});

		console.log(internalFormat);

		this.setState({
			menuCard: internalFormat
		});
	};

	componentDidMount = () => {
		this.loadDishes();
	};
	selectPage = type => {
		let page = this.state.page;
		let maxPage = this.state.menuCard[this.state.menuCard.length - 1].page;
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
			Axios.post(mainSettings.backendServer + "/rotisserie/table_request", content).then(function(response) {
				setTimeout(function() {
					window.store.dispatch({ type: "REQUEST_FINISHED", name: "responseMessage", response: response.data.message });
				}, 1000);
			});
		}
	};

	async loadDishes() {
		const dishes = (await Axios.get(mainSettings.backendServer + "/rotisserie/menuCard/" + mainSettings.menuCard)).data;

		this.setState(
			{
				dishes
			},
			this.convertToFormat
		);
	}
	getDishName = dish => {
		var name = dish.name.replace("\n", "<br>");

		name += "<sup>" + dish.numbers.toString() + "</sup>";

		return name;
	};

	render() {
		const { t } = this.props;
		return (
			<div className="RotisserieRoyalePage">
				<BackgroundSlider images={backgroundImages} autoplay={true} />
				<div id="logo" />
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
							<article className="menu-card">
								<h1>{t("pages.rr.menu_card")}</h1>
								<div className="menu-items">
									{this.state.menuCard &&
										this.state.menuCard.map(menuSection => {
											if (this.state.page === menuSection.page) {
												return (
													<div key={menuSection.info.elementId} className={menuSection.info.isMenuCard ? "menu-item" : "menu-item standard-menu"}>
														<div className="menuCardInfoHead">
															<h2>{menuSection.info.name[window.lang]}</h2>
														</div>
														<div className="menuCardContent">
															{menuSection.content.map((dish, index) => (
																<div key={dish.elementId}>
																	<div className={menuSection.info.isMenuCard ? "menu-dish" : "standard-dish"}>
																		<div className="dish-info">
																			<div
																				className="dish-name"
																				dangerouslySetInnerHTML={{
																					__html: dish.name[window.lang].replace(/(?:\r\n|\r|\n)/g, "</br>")
																				}}>
																				{this.state.toggleKennz && <sup className="numbers">{dish.numbers.join(",")}</sup>}
																			</div>
																			{this.state.toggleContent && (
																				<div className="dish-content">{`${translations.contains[window.lang]} ${
																					dish.content[window.lang]
																				}`}</div>
																			)}
																		</div>
																		{!menuSection.info.isMenuCard && (
																			<div className="dish-price">{(dish.price || 0).toFixed(2).replace(".", ",")} €</div>
																		)}
																	</div>
																	{index < menuSection.content.length - 1 && (
																		<p className="dish-divide">
																			<svg height="12" width="300">
																				<path d="M 0 6 C 140 6 140 6 150 0 C 160 6 160 6 300 6 C 160 6 160 6 150 12 C 140 6 140 6 0 6 Z" />
																			</svg>
																		</p>
																	)}
																</div>
															))}

															{menuSection.info.isMenuCard && (
																<div className="menuCard-price">
																	<div className="price">
																		{translations.perPerson[window.lang]}{" "}
																		<span className="mainPrice">{(menuSection.info.price || 0).toFixed(2).replace(".", ",")}</span>
																		€
																		<br />
																		<div className="minPersonsDiv">
																			{translations.menuFor[window.lang]}{" "}
																			<span className="minPersons">{menuSection.info.minPersons || 0}</span>{" "}
																			{translations.persons[window.lang]}
																		</div>
																	</div>
																</div>
															)}

															{menuSection.info.hasCorrespondingWines && (
																<div className="menuCard-correspondingWines">
																	<span dangerouslySetInnerHTML={{ __html: translations.correspondingWines[window.lang] }} /> <br />
																	<div className="price">
																		{translations.perPerson[window.lang]}{" "}
																		<span className="correspondingWinesPrice">
																			{(menuSection.info.correspondingWinesPrice || 0).toFixed(2).replace(".", ",")}
																		</span>
																		€
																	</div>
																</div>
															)}
															{menuSection.info.hasWineRecommendation && (
																<div className="menuCard-wineRecommendation">
																	<div className="headding">{translations.wineRecommendation[window.lang]}</div>
																	<div
																		className="wineRecommendation"
																		dangerouslySetInnerHTML={{ __html: menuSection.info.wineRecommendation }}
																	/>
																</div>
															)}

															{menuSection.info.hasAdditionalText && (
																<div
																	className="menuCard-additionalText"
																	dangerouslySetInnerHTML={{
																		__html: menuSection.info.additionalText[window.lang].replace(/(?:\r\n|\r|\n)/g, "</br>")
																	}}
																/>
															)}
														</div>
													</div>
												);
											} else {
												return "";
											}
										})}
									<div className="menu-background" />
									<div className="menu-card-controls">
										<button type="button" class="slick-arrow slick-prev" onClick={() => this.selectPage("prev")}>
											Previous
										</button>
										<button type="button" class="slick-arrow slick-next" onClick={() => this.selectPage("next")}>
											Next
										</button>
									</div>
								</div>
							</article>
						</div>
						<div className="flex-center">
							<article className="table-reservation middle-content basicInput">
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
										<BasicInput type="tel" name="tableReservationPhone" setValue={this.setInputValue} placeholder={t("input.basic.phone")} />
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
