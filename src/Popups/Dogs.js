import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Popup from "../Components/Popup";

class Dogs extends Component {
	render() {
		const { t } = this.props;
		return (
			<Popup name="dog" title={t("pages.dogs.main_h1")} type="small-popup">
				<p dangerouslySetInnerHTML={{ __html: t("pages.dogs.text.1") }} />
				<p className="bold" dangerouslySetInnerHTML={{ __html: t("pages.dogs.bold.1") }} />

				<h2>{t("pages.dogs.h1.2")}</h2>
				<p dangerouslySetInnerHTML={{ __html: t("pages.dogs.text.2") }} />

				<h2>{t("pages.dogs.h1.3")}</h2>
				<p dangerouslySetInnerHTML={{ __html: t("pages.dogs.text.3") }} />
				<p className="bold" dangerouslySetInnerHTML={{ __html: t("pages.dogs.bold.2") }} />
			</Popup>
		);
	}
}

export default withTranslation()(Dogs);
