import React from "react";
import { Route, Switch } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLocaleMessages as setFormLocaleMessages, FormLocales } from "onedash-react-input-form";
import { setLocaleMessages as setDialogLocaleMessages, DialogLocales, DialogUtils } from "onedash-dialog";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import GermanDate from "dayjs/locale/de";
import EnglishDate from "dayjs/locale/en";
import HomePage from "./Pages/HomePage";
import "./Styles/Reset.scss";
import "./Styles/MainStyle.scss";
import Navigation from "./Components/Navigation";
import RotisserieRoyalePage from "./Pages/RotisserieRoyalePage";
import Privacy from "./Popups/Privacy";
import Impressum from "./Popups/Impressum";
import Location from "./Popups/Location";
import Contact from "./Popups/Contact";
import GaestehausAmSchlossberg from "./Pages/GaestehausAmSchlossberg";
import Corona from "./Pages/Corona";
import Dogs from "./Popups/Dogs";
import ResponseMessage from "./Popups/ResponseMessage";
import PageNotFound from "./Components/404";
import PopupContext, { initialPopupContext } from "./Utils/PopupContext";

dayjs.extend(localizedFormat);

const App = () => {
	const { 1: locale } = useTranslation();
	const [popupState, updatePopupState] = React.useState(initialPopupContext);
	React.useEffect(() => {
		DialogUtils.registerHeightHelper();
	}, []);
	React.useEffect(() => {
		updatePopupState((s) => ({
			...s,
			togglePopup: (popupName) => {
				updatePopupState((ss) => ({ ...ss, [popupName]: !ss[popupName] }));
			},
			updateResponseMessage: (responseMessage) => {
				updatePopupState((ss) => ({ ...ss, responseMessage }));
			},
		}));
	}, []);

	React.useEffect(() => {
		const langKey = locale.language.indexOf("de") !== -1 ? "de" : "en";
		// Set form locales to German
		setFormLocaleMessages(langKey === "de" ? FormLocales.DE : FormLocales.EN);

		// Set dialog locales to German
		setDialogLocaleMessages(langKey === "de" ? DialogLocales.DE : DialogLocales.EN);

		window.lang = langKey;

		dayjs.locale(langKey === "de" ? GermanDate : EnglishDate);
	}, [locale.language]);
	return (
		<PopupContext.Provider value={popupState}>
			<div>
				<Navigation />

				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/Rotisserie-Royale" component={RotisserieRoyalePage} />
					<Route exact path="/Gästehaus-am-Schlossberg" component={GaestehausAmSchlossberg} />
					<Route exact path="/Rotisserie-Royale/corona/:tableNum" component={Corona} />
					<Route exact path="/Rotisserie-Royale/corona" component={Corona} />
					<Route component={PageNotFound} />
				</Switch>
				<section className="popups">
					<Privacy isOpen={popupState.privacy} />
					<Impressum isOpen={popupState.impressum} />
					<Location isOpen={popupState.location} />
					<Contact isOpen={popupState.contact} />
					<Dogs isOpen={popupState.dogs} />
					<ResponseMessage isOpen={popupState.response} />
				</section>
			</div>
		</PopupContext.Provider>
	);
};

export default App;
