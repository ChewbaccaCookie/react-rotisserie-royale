import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import BackgroundSlider from "../Components/BackgroundSlider";
import "../Styles/Pages.RotisserieRoyale.scss";
import Footer from "../Components/Footer";
import Axios from "axios";
import moment from "moment";
import { Form, Input, DatePicker } from "@onedash/tools";
import PopupUtils from "../Utils/PopupUtils";

let backgroundImages = [
	{
		src: "/Assets/MinifiedImages/rr-slider-1-min.jpg",
	},
	{
		src: "/Assets/MinifiedImages/rr-slider-2-min.jpg",
	},
	{
		src: "/Assets/MinifiedImages/rr-slider-3-min.jpg",
	},
];

class RotisserieRoyalePage extends Component {
	state = {
		reservationNotification: undefined,
	};

	sendTableReservationRequest = (data, form) => {
		form.resetForm();
		data.tableReservationDate = data.tableReservationDate.format("ll");
		const reqData = {
			inputVal: data,
			language: window.lang,
		};
		PopupUtils.showPopup("responseMessage");
		Axios.post(process.env.REACT_APP_BACKEND_ENDPOINT + "/contactRequest/table_request", reqData).then(function (response) {
			setTimeout(function () {
				PopupUtils.setResponseMessage(response.data.message);
			}, 1000);
		});
	};
	validatePersonNum = (value) => {
		if (value > 6) {
			this.setState({
				reservationNotification: this.props.t("input.basic.tooManyPeople"),
			});
			return false;
		}

		this.setState({
			reservationNotification: undefined,
		});

		return true;
	};

	render() {
		const { t } = this.props;
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
							<article id="table-reservation" className="table-reservation middle-content basicInput">
								<h1>{t("pages.rr.table_reservation")}</h1>
								<Form onSubmit={this.sendTableReservationRequest} validateOnSubmit submitText={t("input.basic.table_reservation")}>
									<div className="fieldset">
										<Input
											autoComplete="name"
											type="text"
											name="tableReservationName"
											required
											placeholder={t("input.basic.name")}
										/>
										<Input
											autoComplete="street-address"
											type="text"
											name="tableReservationStreet"
											required
											placeholder={t("input.basic.street")}
										/>
										<Input
											autoComplete="postal-code"
											type="text"
											name="tableReservationPlz"
											required
											placeholder={t("input.basic.plz")}
										/>
										<Input
											autoComplete="address-level2"
											type="text"
											name="tableReservationCity"
											required
											placeholder={t("input.basic.city")}
										/>
										<Input autoComplete="tel" type="text" name="tableReservationPhone" placeholder={t("input.basic.phone")} />
										<Input
											autoComplete="email"
											type="email"
											name="tableReservationEmail"
											required
											placeholder={t("input.basic.email")}
										/>
									</div>
									<div className="fieldset">
										<DatePicker
											minDate={moment()}
											langKey={window.lang}
											name="tableReservationDate"
											required
											placeholder={t("input.basic.date")}
										/>
										<Input type="time" name="tableReservationTime" required placeholder={t("input.basic.time")} />
										<Input
											type="number"
											settings={{ allowNumberNull: false }}
											name="tableReservationNum"
											required
											placeholder={t("input.basic.num_pers")}
											onValidate={this.validatePersonNum}
										/>
										<Input
											type="textarea"
											name="tableReservationAdditionalMessage"
											placeholder={t("input.basic.additional_info")}
										/>
										{this.state.reservationNotification && (
											<div className="form-notification">{this.state.reservationNotification}</div>
										)}
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

export default withTranslation()(RotisserieRoyalePage);
