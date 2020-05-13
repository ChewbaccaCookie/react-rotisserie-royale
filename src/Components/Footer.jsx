import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "../Styles/Component.Footer.scss";
import PopupUtils from "../Utils/PopupUtils";

class Footer extends Component {
	render() {
		const { t } = this.props;

		return (
			<div>
				<section className="footer">
					<div className="footer-nav">
						<ul>
							<li onClick={() => PopupUtils.showPopup("contact")}>{t("footer.contact")}</li>
							<li onClick={() => PopupUtils.showPopup("privacy")}>{t("basic.privacy")}</li>
							<li onClick={() => PopupUtils.showPopup("impressum")}>{t("basic.impressum")}</li>
							<li onClick={() => PopupUtils.showPopup("location")}>{t("footer.location")}</li>
						</ul>
					</div>

					<p className="text-center">
						Copyright ©{new Date().getFullYear()} by <a href="https://onedash.de">OneDash.</a> All Rights Reserved
					</p>
				</section>
			</div>
		);
	}
}

export default withTranslation()(Footer);
