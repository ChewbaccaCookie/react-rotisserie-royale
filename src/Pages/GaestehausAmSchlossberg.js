import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import "../Styles/Pages.GaestehausAmSchlossberg.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BackgroundSlider from "../Components/BackgroundSlider";
import Footer from "../Components/Footer";
import Slider from "react-slick";
import $ from "jquery";
import BasicInput from "../Components/BasicInput";
import mainSettings from "../MainSettings";
import Axios from "axios";

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
		disabled: true
	};

	componentDidMount = () => {
		this.loadArrangements();
	};

	async loadArrangements() {
		try {
			const arrangements = (await Axios.get(mainSettings.backendServer + "/arrangements/")).data;
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
	};
	sendContactRequest = e => {
		e.preventDefault();
		$(".popups input").each((index, element) => {
			element.value = "";
		});
		this.checkValidationStatus();
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
							<article className="table-reservation middle-content basicInput">
								<h1>{t("pages.gh.booking_request")}</h1>
								<form onSubmit={this.sendContactRequest}>
									<fieldset>
										<BasicInput
											type="text"
											name="table_reservation-name"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.name")}
										/>
										<BasicInput
											type="text"
											name="table_reservation-street"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.street")}
										/>
										<BasicInput type="num" name="table_reservation-plz" required={true} setValue={this.setInputValue} placeholder={t("input.basic.plz")} />
										<BasicInput
											type="text"
											name="table_reservation-city"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.city")}
										/>
										<BasicInput type="tel" name="table_reservation-phone" setValue={this.setInputValue} placeholder={t("input.basic.phone")} />
										<BasicInput
											type="email"
											name="table_reservation-email"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.email")}
										/>
									</fieldset>
									<fieldset>
										<BasicInput
											type="date"
											name="table_reservation-date"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.arrival")}
										/>
										<BasicInput
											type="date"
											name="table_reservation-date"
											required={true}
											setValue={this.setInputValue}
											placeholder={t("input.basic.departure")}
										/>

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

export default withTranslation()(GaestehausAmSchlossberg);
