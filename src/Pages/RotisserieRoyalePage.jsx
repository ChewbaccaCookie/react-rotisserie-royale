import React from "react";
import { useTranslation } from "react-i18next";
import Axios from "axios";
import { DatePicker, Form, Input, Textarea } from "onedash-react-input-form";
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
		const [hour, minute] = data.time.split(":");

		data.values.timestamp = dayjs(data.date).add(hour, "hour").add(minute, "minute").toDate().getTime();

		togglePopup("response");
		Axios.post(`${process.env.REACT_APP_NEW_BACKEND_ENDPOINT}/form/submit/tableReservation`, data).then((response) => {
			setTimeout(() => {

				updateResponseMessage(response.data.type === "S" ? t(""));
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
											name="personalData.name"
											required
											placeholder={t("input.basic.name")}
										/>
										<Input
											autoComplete="street-address"
											type="text"
											name="personalData.street"
											required
											placeholder={t("input.basic.street")}
										/>
										<Input
											autoComplete="postal-code"
											type="text"
											name="personalData.plz"
											required
											placeholder={t("input.basic.plz")}
										/>
										<Input
											autoComplete="address-level2"
											type="text"
											name="personalData.city"
											required
											placeholder={t("input.basic.city")}
										/>
										<Input
											autoComplete="tel"
											type="text"
											name="personalData.phone"
											placeholder={t("input.basic.phone")}
										/>
										<Input
											autoComplete="email"
											type="email"
											name="personalData.email"
											required
											placeholder={t("input.basic.email")}
										/>
									</div>
									<div className="fieldset">
										<DatePicker
											minDate={dayjs().add(1, "day").toDate().getTime()}
											langKey={i18n.language}
											name="date"
											required
											label={t("input.basic.date")}
											placeholder={t("input.basic.date")}
											withPortal
										/>
										<Input
											type="time"
											name="time"
											required
											label={t("input.basic.time")}
											placeholder={t("input.basic.date")}
											settings={{ min: "11:30", max: "21:00", step: 900 }}
										/>
										<Input
											name="values.peopleNum"
											required
											placeholder={t("input.basic.num_pers")}
											onValidate={validatePersonNum}
											className="full-width"
											settings={{ allowNumberNull: false, allowNumberNegative: false, validateTel: false }}
											maxLength={2}
											type="tel"
											pattern="^$|^[0-9]+$"
										/>
										<Textarea
											name="values.text"
											className="full-width"
											rows={3}
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
