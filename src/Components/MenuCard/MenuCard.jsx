import axios from "axios";
import React from "react";
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner/Spinner";
import "./MenuCard.sass";

const initialState = {
	menuCardLink: undefined,
};

const MenuCard = () => {
	const [state, update] = React.useState(initialState);
	const { t, i18n } = useTranslation();

	React.useEffect(() => {
		const loadAppSettings = async () => {
			const url = `${process.env.REACT_APP_NEW_BACKEND_ENDPOINT}/appSettings/menuCardLink`;
			const menuCardLink = await (await axios.get(url)).data.data;
			update({
				menuCardLink,
			});
		};
		loadAppSettings();
	}, []);

	return (
		<div className="menu-card-wrapper">
			<div className="menu-card">
				{state.menuCardLink ? (
					<iframe
						width="720"
						height="480"
						frameBorder={0}
						src={`${state.menuCardLink}?lng=${i18n.language.indexOf("de") !== -1 ? "de" : "en"}`}
						title={t("menu-card.iframe-title")}
					/>
				) : (
					<Spinner />
				)}
			</div>
		</div>
	);
};

export default MenuCard;
