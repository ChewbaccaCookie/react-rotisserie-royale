import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import i18n from "../i18n";
import "../Styles/Component.Nav.scss";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

class Navigation extends Component {
	state = {
		menuOpen: false
	};
	toggleNav = () => {
		this.setState({
			menuOpen: !this.state.menuOpen
		});
	};
	componentWillMount = () => {
		window.lang = cookie.get("lang");
		if (window.lang) {
			i18n.changeLanguage(window.lang);
		} else {
			//Get Browser language => Set right Language
			let userLang = navigator.language || navigator.userLanguage;
			console.log(userLang);
			if (userLang === "de-DE") {
				this.setLanguage("de");
			} else {
				//Fallback for other user
				this.setLanguage("en");
			}
		}
	};
	setLanguage = lang => {
		i18n.changeLanguage(lang);
		window.lang = lang;
		cookie.set("lang", lang, { path: "/", expires: new Date(9999, 11, 31) });
	};
	toggleLanguage = () => {
		this.toggleNav();
		if (window.lang === "de") {
			this.setLanguage("en");
		} else {
			this.setLanguage("de");
		}
	};
	openPopup = name => {
		this.toggleNav();
		window.store.dispatch({ type: "TOGGLE_POPUP", name });
	};
	render() {
		const { t } = this.props;
		return (
			<div className={this.state.menuOpen === true ? "navOpen Navigation" : "Navigation"}>
				<div id="nav-icon" className={this.state.menuOpen === true ? "open" : ""} onClick={this.toggleNav}>
					<span />
					<span />
					<span />
					<span />
				</div>

				<div className="overlay-content">
					<NavLink onClick={this.toggleNav} activeClassName="nav-is-active" exact to="/" className="navigation-link">
						{t("navigation.home")}
					</NavLink>
					<NavLink onClick={this.toggleNav} activeClassName="nav-is-active" to="/Rotisserie-Royale" className="navigation-link">
						{t("basic.rotisserie_royale")}
					</NavLink>
					<NavLink onClick={this.toggleNav} activeClassName="nav-is-active" to="/Gästehaus-am-Schlossberg" className="navigation-link">
						{t("basic.gaestehaus_am_schlossberg")}
					</NavLink>
					<div className="additional-links">
						<button onClick={() => this.openPopup("impressum")}>{t("basic.impressum")}</button>
						<button onClick={() => this.openPopup("privacy")}>{t("basic.privacy")}</button>
						<button onClick={this.toggleLanguage} className="navigation-link">
							{t("basic.translation_toggle")}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default withTranslation()(Navigation);
