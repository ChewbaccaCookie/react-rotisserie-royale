import React from "react";

export const initialPopupContext = {
	privacy: false,
	impressum: false,
	location: false,
	contact: false,
	dogs: false,
	response: false,
	responseMessage: undefined,
	togglePopup: () => {},
	updateResponseMessage: () => {},
};

const PopupContext = React.createContext(initialPopupContext);
export default PopupContext;
