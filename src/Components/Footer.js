import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "../Styles/Component.Footer.scss";

class Footer extends Component {
	openPopup = name => {
		window.store.dispatch({ type: "TOGGLE_POPUP", name });
	};
	render() {
		const { t } = this.props;

		return (
			<div>
				<section className="footer">
					<div className="footer-nav">
						<ul>
							<li onClick={() => this.openPopup("contact")}>{t("footer.contact")}</li>
							<li onClick={() => this.openPopup("privacy")}>{t("basic.privacy")}</li>
							<li onClick={() => this.openPopup("impressum")}>{t("basic.impressum")}</li>
							<li onClick={() => this.openPopup("location")}>{t("footer.location")}</li>
						</ul>
					</div>

					<p className="text-center">Copyright ©{new Date().getFullYear()} by www.rotisserie-royale.de. All Rights Reserved</p>
				</section>
			</div>
		);
	}
}

export default withTranslation()(Footer);
