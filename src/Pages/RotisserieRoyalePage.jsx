import React from "react";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import { DatePicker, Form, Input } from "onedash-react-input-form";
import dayjs from "dayjs";
import "react-awesome-slider/dist/styles.css";
import { Popover } from "onedash-dialog";
import BackgroundSlider from "../Components/BackgroundSlider";
import "../Styles/Pages.RotisserieRoyale.scss";
import Footer from "../Components/Footer";
import MenuCard from "../Components/MenuCard/MenuCard";
import PopupContext from "../Utils/PopupContext";
import MediaRender from "../Components/MediaRender";

const backgroundImages = [
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

const RotisserieRoyalePage = () => {
	const { t, 1: i18n } = useTranslation();
	const { togglePopup, updateResponseMessage } = React.useContext(PopupContext);
	const [state, update] = React.useState({
		reservationNotification: undefined,
		menuCardDialog: false,
	});

	const sendTableReservationRequest = (data, form) => {
		form.resetForm();
		setTimeout(() => form.validateSubmitBtn());
		data.tableReservationDate = dayjs(data.tableReservationDate).format("LL");
		const reqData = {
			inputVal: data,
			language: window.lang,
		};
		togglePopup("response");
		Axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/contactRequest/table_request`, reqData).then((response) => {
			setTimeout(() => {
				updateResponseMessage(response.data.message);
			}, 1000);
		});
	};

	const validatePersonNum = (value) => {
		if (value > 6) {
			update((s) => ({ ...s, reservationNotification: t("input.basic.tooManyPeople") }));
			return false;
		}

		update((s) => ({
			...s,
			reservationNotification: undefined,
		}));

		return true;
	};
	return (
		<>
			<div className="RotisserieRoyalePage">
				<BackgroundSlider images={backgroundImages} autoplay />
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
							<h1>{t("pages.rr.menu_card")}</h1>
							<MediaRender type="desktop">
								<MenuCard />
							</MediaRender>
							<MediaRender type="mobile">
								<button className="btn" onClick={() => update((s) => ({ ...s, menuCardDialog: true }))}>
									Speisekarte anzeigen
								</button>
							</MediaRender>
						</div>

						<div className="flex-center">
							<article id="table-reservation" className="table-reservation middle-content basicInput">
								<h1>{t("pages.rr.table_reservation")}</h1>
								<Form
									onSubmit={sendTableReservationRequest}
									validateOnSubmit
									submitText={t("input.basic.table_reservation")}>
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
										<Input
											autoComplete="tel"
											type="text"
											name="tableReservationPhone"
											placeholder={t("input.basic.phone")}
										/>
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
											minDate={dayjs().add(1, "day").toDate().getTime()}
											langKey={i18n.language}
											name="tableReservationDate"
											required
											placeholder={t("input.basic.date")}
											withPortal
										/>
										<Input type="time" name="tableReservationTime" required placeholder={t("input.basic.time")} />
										<Input
											type="number"
											settings={{ allowNumberNull: false }}
											name="tableReservationNum"
											required
											placeholder={t("input.basic.num_pers")}
											onValidate={validatePersonNum}
										/>
										<Input
											type="textarea"
											name="tableReservationAdditionalMessage"
											placeholder={t("input.basic.additional_info")}
										/>
										<div className="form-notification">{t("pages.rr.reservationNotice")}</div>
										{state.reservationNotification && (
											<div className="form-notification">{state.reservationNotification}</div>
										)}
									</div>
								</Form>
							</article>
						</div>
					</section>

					<Footer />
				</div>
			</div>
			<Popover isOpen={state.menuCardDialog} onClose={() => update((s) => ({ ...s, menuCardDialog: false }))}>
				<MenuCard />
			</Popover>
		</>
	);
};

export default RotisserieRoyalePage;
