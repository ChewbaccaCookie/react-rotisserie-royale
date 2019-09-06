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
import $ from "jquery";
import BasicInput from "../Components/BasicInput";
import mainSettings from "../MainSettings";
import Axios from "axios";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "moment/locale/de";
import "moment/locale/en-gb";

let backgroundImages = [
	{
		src: "/Assets/MinifiedImages/gh-slider-1-min.jpg"
	},
	{
		src: "/Assets/MinifiedImages/gh-slider-2-min.jpg"
	},
	{
		src: "/Assets/MinifiedImages/gh-slider-3-min.jpg"
	},
	{
		src: "/Assets/MinifiedImages/gh-slider-4-min.jpg"
	}
];

class GaestehausAmSchlossberg extends Component {
	state = {
		inputValues: [],
		disabled: true,
		date: new Date()
	};

	componentDidMount = () => {
		this.loadArrangements();
	};

	async loadArrangements() {
		try {
			const arrangements = (await Axios.get(process.env.REACT_APP_BACKEND_ENDPOINT + "/arrangements/get")).data;
			arrangements.forEach(arr => {
				arr.price = arr.price.toFixed(2).replace(".", ",") + "€";
			});
			this.setState({
				arrangements
			});
		} catch (err) {
			console.log(err);
		}
	}

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
	sendBookingRequest = e => {
		e.preventDefault();
		if (this.checkValidationStatus()) {
			$(".booking-request input, .booking-request textarea").each((index, element) => {
				element.value = "";
			});
			let content = {
				language: window.lang,
				inputVal: {}
			};
			this.state.inputValues
				.filter(input => input.name.indexOf("bookingRequest") === 0)
				.forEach(inputVal => {
					content.inputVal[inputVal.name] = inputVal.value;
				});

			window.store.dispatch({ type: "TOGGLE_POPUP", name: "responseMessage" });
			Axios.post(mainSettings.backendServer + "/rotisserie/booking_request", content).then(function(response) {
				setTimeout(function() {
					window.store.dispatch({ type: "REQUEST_FINISHED", name: "responseMessage", response: response.data.message });
				}, 1000);
			});
		}
	};

	openPopup = name => {
		window.store.dispatch({ type: "TOGGLE_POPUP", name });
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
						autoplay: true
					}
				}
			]
		};
		return (
			<div className="RotisserieRoyalePage">
				<BackgroundSlider images={backgroundImages} autoplay={true} />
				<div id="logo" />
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
								<p className="sub-text" dangerouslySetInnerHTML={{ __html: t("pages.gh.dog.sub_text") }} />
								<button
									onClick={() => {
										this.openPopup("dog");
									}}
									className="blue">
									{t("basic.more_information")}
								</button>
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
														backgroundImage: "url('" + element.imageSrc + "')"
													}}
												/>
												<div className="arrangement-content">
													<h2>{element.names[window.lang]}</h2>
													<ul>{element.content[window.lang] && element.content[window.lang].map(li => <li key={li}>{li}</li>)}</ul>
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
								<form onSubmit={this.sendBookingRequest}>
									<fieldset>
										<BasicInput type="text" name="bookingRequestName" required={true} setValue={this.setInputValue} placeholder={t("input.basic.name")} />
										<BasicInput
											type="text"
											name="bookingRequestStreet"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.street")}
										/>
										<BasicInput type="number" name="bookingRequestPLZ" required={true} setValue={this.setInputValue} placeholder={t("input.basic.plz")} />
										<BasicInput type="text" name="bookingRequestCity" required={true} setValue={this.setInputValue} placeholder={t("input.basic.city")} />
										<BasicInput type="tel" name="bookingRequestPhone" setValue={this.setInputValue} placeholder={t("input.basic.phone")} />
										<BasicInput
											type="email"
											name="bookingRequestEmail"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.email")}
										/>
									</fieldset>
									<fieldset>
										<BasicInput
											type="dateRange"
											name1="bookingRequestArrival"
											name2="bookingRequestDeparture"
											dateFormat={t("input.basic.dateFormat")}
											setValue={this.setInputValue}
											placeholder1={t("input.basic.arrival")}
											placeholder2={t("input.basic.departure")}
											required={true}
										/>

										<BasicInput
											type="textarea"
											name="bookingRequestAdditionalMessage"
											setValue={this.setInputValue}
											placeholder={t("input.basic.additional_info")}
										/>
										<button className="btn" disabled={this.state.disabled}>
											{t("input.basic.booking_request")}
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

export default withTranslation()(GaestehausAmSchlossberg);
