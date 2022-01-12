import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "../Styles/Component.Nav.scss";
import PopupContext from "../Utils/PopupContext";

const Navigation = () => {
	const { 1: i18n, t } = useTranslation();
	const { togglePopup } = React.useContext(PopupContext);
	const [state, update] = React.useState({
		menuOpen: false,
	});

	const toggleNav = () => {
		update((x) => ({ ...x, menuOpen: !x.menuOpen }));
	};

	const setLanguage = React.useCallback(
		(lang) => {
			i18n.changeLanguage(lang);
			window.lang = lang;
		},
		[i18n]
	);

	const toggleLanguage = () => {
		toggleNav();
		if (window.lang === "de") {
			setLanguage("en");
		} else {
			setLanguage("de");
		}
	};

	const openPopup = (name) => {
		toggleNav();
		togglePopup(name);
	};

	return (
		<div>
			<button id="nav-icon" className={state.menuOpen === true ? "open" : ""} onClick={toggleNav}>
				<span />
				<span />
				<span />
				<span />
			</button>
			<div className={state.menuOpen === true ? "navOpen Navigation" : "Navigation"}>
				<div className="overlay-content">
					<NavLink onClick={toggleNav} activeClassName="nav-is-active" exact to="/" className="navigation-link">
						{t("navigation.home")}
					</NavLink>
					<NavLink onClick={toggleNav} activeClassName="nav-is-active" to="/rotisserie-royale" className="navigation-link">
						{t("basic.rotisserie_royale")}
					</NavLink>
					<NavLink
						onClick={toggleNav}
						activeClassName="nav-is-active"
						to="/gaestehaus-am-schlossberg"
						className="navigation-link">
						{t("basic.gaestehaus_am_schlossberg")}
					</NavLink>
					<div className="additional-links">
						<button onClick={() => openPopup("impressum")}>{t("basic.impressum")}</button>
						<button onClick={() => openPopup("privacy")}>{t("basic.privacy")}</button>
						<button onClick={toggleLanguage} className="navigation-link">
							{t("basic.translation_toggle")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navigation;
