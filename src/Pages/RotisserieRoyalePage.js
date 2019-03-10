import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import "../Styles/Pages.Home.scss";
import BackgroundSlider from "../Components/BackgroundSlider";
import Footer from "../Components/Footer";
import $ from "jquery";
import BasicInput from "../Components/BasicInput";

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
	};
	sendContactRequest = e => {
		e.preventDefault();
		$(".popups input").each((index, element) => {
			element.value = "";
		});
		this.checkValidationStatus();
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
								<form onSubmit={this.sendContactRequest}>
									<fieldset>
										<BasicInput type="text" name="table_reservation-name" required={true} setValue={this.setInputValue} placeholder={t("input.basic.name")} />
										<BasicInput type="text" name="table_reservation-street" required={true} setValue={this.setInputValue} placeholder={t("input.basic.street")} />
										<BasicInput type="num" name="table_reservation-plz" required={true} setValue={this.setInputValue} placeholder={t("input.basic.plz")} />
										<BasicInput type="text" name="table_reservation-city" required={true} setValue={this.setInputValue} placeholder={t("input.basic.city")} />
										<BasicInput type="tel" name="table_reservation-phone" setValue={this.setInputValue} placeholder={t("input.basic.phone")} />
										<BasicInput type="email" name="table_reservation-email" required={true} setValue={this.setInputValue} placeholder={t("input.basic.email")} />
									</fieldset>
									<fieldset>
										<BasicInput type="date" name="table_reservation-date" required={true} setValue={this.setInputValue} placeholder={t("input.basic.date")} />
										<BasicInput type="time" name="table_reservation-time" required={true} setValue={this.setInputValue} placeholder={t("input.basic.time")} />
										<BasicInput type="num" name="table_reservation-count" required={true} setValue={this.setInputValue} placeholder={t("input.basic.num_pers")} />
										<BasicInput
											type="text"
											name="table_reservation-message"
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
