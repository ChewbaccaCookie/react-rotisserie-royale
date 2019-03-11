import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Popup from "../Components/Popup";

class Impressum extends Component {
	render() {
		const { t } = this.props;
		return <Popup name="dog" title={t("pages.dogs.h1")} />;
	}
}

export default withTranslation()(Impressum);
