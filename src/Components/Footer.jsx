/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { useTranslation } from "react-i18next";
import "../Styles/Component.Footer.scss";
import PopupContext from "../Utils/PopupContext";

const Footer = () => {
	const { togglePopup } = React.useContext(PopupContext);
	const { t } = useTranslation();

	return (
		<div>
			<section className="footer">
				<div className="footer-nav">
					<ul>
						<li onClick={() => togglePopup("contact")}>{t("footer.contact")}</li>
						<li onClick={() => togglePopup("privacy")}>{t("basic.privacy")}</li>
						<li onClick={() => togglePopup("impressum")}>{t("basic.impressum")}</li>
						<li onClick={() => togglePopup("location")}>{t("footer.location")}</li>
					</ul>
				</div>

				<p className="text-center">
					Copyright ©{new Date().getFullYear()} by <a href="https://onedash.de">OneDash.</a> All Rights Reserved
				</p>
			</section>
		</div>
	);
};

export default Footer;
