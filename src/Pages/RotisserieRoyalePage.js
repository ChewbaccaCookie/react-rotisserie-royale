import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import BackgroundSlider from "../Components/BackgroundSlider";
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

class RotisserieRoyalePage extends Component {
	state = {
		inputValues: [],
		disabled: true
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
	sendTableReservationRequest = e => {
		e.preventDefault();
		if (this.checkValidationStatus()) {
			console.log("fa");
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
							<article className="table-reservation">
								<h1>{t("pages.rr.menu_card")}</h1>
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
										<BasicInput type="num" name="tableReservationPLZ" required={true} setValue={this.setInputValue} placeholder={t("input.basic.plz")} />
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
											type="num"
											name="tableReservationNum"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.num_pers")}
										/>
										<BasicInput
											type="text"
											name="tableReservationAdditionalMessage"
											setValue={this.setInputValue}
											textarea={true}
											placeholder={t("input.basic.additional_info")}
										/>
										<button disabled={this.state.disabled}>{t("input.basic.table_reservation")}</button>
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
