import React from "react";
import dayjs from "dayjs";
import { Dialog } from "onedash-dialog";
import { useTranslation } from "react-i18next";

export const Vacation = () => {
	const { t } = useTranslation();
	const [showDialog, setShowDialog] = React.useState(false);
	React.useEffect(() => {
		const val = sessionStorage.getItem("vacation");
		if (!val) {
			if (dayjs().isBefore(dayjs("2022-01-27"))) {
				setShowDialog(true);
			}
		}
	}, []);

	const onClose = () => {
		setShowDialog(false);
		sessionStorage.setItem("vacation", true);
	};

	return (
		<Dialog closeBtn={<>+</>} onClose={onClose} isOpen={showDialog} name="vacation" title={t("vacation.title")} type="small-popup">
			<p dangerouslySetInnerHTML={{ __html: t("vacation.text") }} />
		</Dialog>
	);
};
