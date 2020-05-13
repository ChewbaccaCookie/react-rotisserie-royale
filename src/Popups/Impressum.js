import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Dialog } from "@onedash/tools";
import PopupUtils from "../Utils/PopupUtils";

class Impressum extends Component {
	render() {
		const { t } = this.props;
		return (
			<Dialog onClose={() => PopupUtils.closePopup("impressum")} isOpen={this.props.isOpen} name="impressum" title={t("pages.impressum.h1")}>
				<h2>{t("basic.rotisserie_royale")}</h2>
				<h3>{t("pages.impressum.h3.resp_person")}</h3>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.rr_resp_person") }} />

				<h3>{t("pages.impressum.h3.contact")}</h3>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.rr_contact") }} />

				<h3>{t("pages.impressum.h3.business_disclosure")}</h3>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.rr_business_disclosure") }} />

				<h2>{t("basic.gaestehaus_am_schlossberg")}</h2>
				<h3>{t("pages.impressum.h3.resp_person")}</h3>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.gh_resp_person") }} />

				<h3>{t("pages.impressum.h3.contact")}</h3>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.gh_contact") }} />

				<h3>{t("pages.impressum.h3.business_disclosure")}</h3>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.gh_business_disclosure") }} />

				<h2>{t("pages.impressum.h2.agb")}</h2>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.agb") }} />

				<h2>{t("pages.impressum.h2.disclaimer")}</h2>
				<h3>{t("pages.impressum.h3.disclaimer.content")}</h3>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.disclaimer.content") }} />
				<h3>{t("pages.impressum.h3.disclaimer.links")}</h3>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.disclaimer.links") }} />
				<h3>{t("pages.impressum.h3.disclaimer.copyright")}</h3>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.disclaimer.copyright") }} />

				<h2>{t("pages.impressum.h2.design")}</h2>
				<p dangerouslySetInnerHTML={{ __html: t("pages.impressum.text.design") }} />
			</Dialog>
		);
	}
}

export default withTranslation()(Impressum);
