import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Dialog } from "@onedash/tools";
import PopupUtils from "../Utils/PopupUtils";

class Privacy extends Component {
	render() {
		const n = 21;
		const { t } = this.props;
		return (
			<Dialog onClose={() => PopupUtils.closePopup("privacy")} isOpen={this.props.isOpen} name="privacy" title={t("pages.privacy.h1")}>
				<p>{t("pages.privacy.start_text")}</p>
				{[...Array(n)].map((e, i) => (
					<div key={`div-${i}`}>
						<h2>{t(`pages.privacy.h2.${i + 1}`)}</h2>
						<p dangerouslySetInnerHTML={{ __html: t(`pages.privacy.text.${i + 1}`) }} />
					</div>
				))}
			</Dialog>
		);
	}
}

export default withTranslation()(Privacy);
