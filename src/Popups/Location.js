import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Dialog } from "@onedash/tools";
import PopupUtils from "../Utils/PopupUtils";

class Impressum extends Component {
	render() {
		const { t } = this.props;
		return (
			<Dialog onClose={() => PopupUtils.closePopup("location")} isOpen={this.props.isOpen} buttons={[]} className="full-size">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1284.5858750367072!2d7.0773974335615675!3d49.91435123358507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47be25bd6cfaae5d%3A0x4a94b3eb32e42faa!2sRotisserie+Royale!5e0!3m2!1sde!2sde!4v1552220465844"
					width="100%"
					height="450"
					title={t("footer.location")}
					allowFullScreen={true}
				/>
			</Dialog>
		);
	}
}

export default withTranslation()(Impressum);