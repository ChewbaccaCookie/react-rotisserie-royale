import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import "../Styles/Pages.GaestehausAmSchlossberg.scss";
import "../Styles/Component.Calendar.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackgroundSlider from "../Components/BackgroundSlider";
import Footer from "../Components/Footer";
import Slider from "react-slick";
import Axios from "axios";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import { Form, Input, DateRangePicker } from "@onedash/tools";
import PopupUtils from "../Utils/PopupUtils";
import moment from "moment";

let backgroundImages = [
	{
		src: "/Assets/MinifiedImages/gh-slider-1-min.jpg",
	},
	{
		src: "/Assets/MinifiedImages/gh-slider-2-min.jpg",
	},
	{
		src: "/Assets/MinifiedImages/gh-slider-3-min.jpg",
	},
	{
		src: "/Assets/MinifiedImages/gh-slider-4-min.jpg",
	},
];

class GaestehausAmSchlossberg extends Component {
	state = {
		inputValues: [],
		disabled: true,
		date: new Date(),
	};

	componentDidMount = () => {
		this.loadArrangements();
	};

	async loadArrangements() {
		try {
			const arrangements = (await Axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + "/arrangements/get")).data;
			arrangements.forEach((arr) => {
				arr.price = arr.price.toFixed(2).replace(".", ",") + "€";
			});
			this.setState({
				arrangements,
			});
		} catch (err) {
			console.log(err);
		}
	}

	setInputValue = (name, value, valid) => {
		let inputValues = this.state.inputValues;
		let obj = inputValues.find((x) => x.name === name);

		if (obj) {
			obj.valid = valid;
			obj.value = value;
		} else {
			obj = {
				name,
				valid,
				value,
			};
			inputValues.push(obj);
		}
		this.setState(
			{
				inputValues,
			},
			this.checkValidationStatus
		);
	};
	checkValidationStatus = () => {
		let valid = true;
		this.state.inputValues.forEach((element) => {
			if (element.valid === false) {
				valid = false;
			}
		});
		this.setState({
			disabled: !valid,
		});
		return valid;
	};
	sendBookingRequest = (data, form) => {
		form.resetForm();
		data.bookingRequestArrival = data.bookingRequestDate.startDate.format("ll");
		data.bookingRequestDeparture = data.bookingRequestDate.endDate.format("ll");
		const reqData = {
			inputVal: data,
			language: window.lang,
		};
		PopupUtils.showPopup("responseMessage");
		Axios.post(process.env.REACT_APP_BACKEND_ENDPOINT + "/contactRequest/bookign_request", reqData).then(function (response) {
			setTimeout(function () {
				PopupUtils.setResponseMessage(response.data.message);
			}, 1000);
		});
	};

	openPopup = (name) => {
		PopupUtils.showPopup(name);
	};
	render() {
		const { t } = this.props;
		const settings = {
			dots: false,
			infinite: true,
			centerMode: true,
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			speed: 2000,
			autoplaySpeed: 4000,
			pauseOnHover: true,
			cssEase: "ease-in-out",
			responsive: [
				{
					breakpoint: 720,
					settings: {
						centerMode: false,
						slidesToShow: 1,
						slidesToScroll: 1,
						speed: 700,
						arrows: false,
						autoplay: true,
					},
				},
			],
		};
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
						<h1 dangerouslySetInnerHTML={{ __html: t("pages.gh.welcome_h1") }} />

						<div className="flex-center">
							<article className="middle-content big-capital">
								<p>
									<span className="bigLetter">{t("pages.gh.text_first_letter")}</span>
									{t("pages.gh.text")}
								</p>
							</article>
						</div>
						<div className="flex-center">
							<article className="small-content text-center">
								<h1>{t("pages.gh.dog.h1")}</h1>
								<p>{t("pages.gh.dog.main_text")}</p>
							</article>
							<article className="small-content text-center">
								<h1>{t("pages.gh.rooms.h1")}</h1>
								<p dangerouslySetInnerHTML={{ __html: t("pages.gh.rooms.prices") }} />
								<p className="sub-text" dangerouslySetInnerHTML={{ __html: t("pages.gh.rooms.tax") }} />
							</article>
						</div>

						<div className="arrangement-slider">
							<article>
								<h1>{t("pages.gh.special_offers")}</h1>
								{this.state.arrangements && (
									<Slider {...settings}>
										{this.state.arrangements.map((element, index) => (
											<div className="arrangement" key={index}>
												<div
													className="arrangement-image"
													style={{
														backgroundImage: "url('" + element.imageSrc + "')",
													}}
												/>
												<div className="arrangement-content">
													<h2>{element.names[window.lang]}</h2>
													<ul>
														{element.content[window.lang] &&
															element.content[window.lang].map((li) => <li key={li}>{li}</li>)}
													</ul>
													<p className="price">
														{t("pages.gh.per_person")} <span className="orange">{element.price}</span>
													</p>
												</div>
											</div>
										))}
									</Slider>
								)}
							</article>
						</div>

						<div className="flex-center">
							<article id="booking-request" className="booking-request middle-content basicInput">
								<h1>{t("pages.gh.booking_request")}</h1>
								<Form
									onSubmit={this.sendBookingRequest}
									submitText={t("input.basic.booking_request")}
									validateOnChange
									styling="none"
								>
									<div className="fieldset">
										<Input required autoComplete="name" name="bookingRequestName" placeholder={t("input.basic.name")} />
										<Input
											required
											name="bookingRequestStreet"
											autoComplete="street-address"
											placeholder={t("input.basic.street")}
										/>
										<Input required name="bookingRequestPLZ" autoComplete="postal-code" placeholder={t("input.basic.plz")} />
										<Input required name="bookingRequestCity" autoComplete="address-level2" placeholder={t("input.basic.city")} />
										<Input type="tel" autoComplete="tel" name="bookingRequestPhone" placeholder={t("input.basic.phone")} />
										<Input
											type="email"
											required
											name="bookingRequestEmail"
											autoComplete="email"
											placeholder={t("input.basic.email")}
										/>
									</div>
									<div className="fieldset">
										<DateRangePicker
											minDate={moment()}
											langKey={window.lang}
											name="bookingRequestDate"
											required
											startPlaceholder={t("input.basic.arrival")}
											endPlaceholder={t("input.basic.departure")}
										/>
										<Input
											type="textarea"
											name="bookingRequestAdditionalMessage"
											placeholder={t("input.basic.additional_info")}
										/>
									</div>
								</Form>
							</article>
						</div>
					</section>
					<Footer />
				</div>
			</div>
		);
	}
}

export default withTranslation()(GaestehausAmSchlossberg);
