import React, { useContext } from "react";
import { Dialog } from "onedash-dialog";
import { useTranslation } from "react-i18next";
import PopupContext from "../Utils/PopupContext";

const Privacy = ({ isOpen }) => {
	const n = 21;
	const { t } = useTranslation();
	const { togglePopup } = useContext(PopupContext);
	return (
		<Dialog onClose={() => togglePopup("privacy")} isOpen={isOpen} name="privacy" title={t("pages.privacy.h1")}>
			<p>{t("pages.privacy.start_text")}</p>
			{[...Array(n)].map((e, i) => (
				// eslint-disable-next-line react/no-array-index-key
				<div key={`div-${i}`}>
					<h2>{t(`pages.privacy.h2.${i + 1}`)}</h2>
					<p dangerouslySetInnerHTML={{ __html: t(`pages.privacy.text.${i + 1}`) }} />
				</div>
			))}
		</Dialog>
	);
};

export default Privacy;
