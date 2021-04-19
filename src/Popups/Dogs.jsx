import React from "react";
import { Dialog } from "onedash-dialog";
import { useTranslation } from "react-i18next";
import PopupContext from "../Utils/PopupContext";

const Dogs = ({ isOpen }) => {
	const { t } = useTranslation();
	const { togglePopup } = React.useContext(PopupContext);
	return (
		<Dialog onClose={() => togglePopup("impressum")} isOpen={isOpen} name="dog" title={t("pages.dogs.main_h1")} type="small-popup">
			<p dangerouslySetInnerHTML={{ __html: t("pages.dogs.text.1") }} />
			<p className="bold" dangerouslySetInnerHTML={{ __html: t("pages.dogs.bold.1") }} />

			<h2>{t("pages.dogs.h1.2")}</h2>
			<p dangerouslySetInnerHTML={{ __html: t("pages.dogs.text.2") }} />

			<h2>{t("pages.dogs.h1.3")}</h2>
			<p dangerouslySetInnerHTML={{ __html: t("pages.dogs.text.3") }} />
			<p className="bold" dangerouslySetInnerHTML={{ __html: t("pages.dogs.bold.2") }} />
		</Dialog>
	);
};

export default Dogs;
