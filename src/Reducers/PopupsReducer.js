const popups = (
	state = [
		{ name: "privacy", open: false },
		{ name: "impressum", open: false },
		{ name: "location", open: false },
		{ name: "contact", open: false },
		{ name: "responseMessage", open: false, loaded: false, response: "" },
		{ name: "dog", open: false }
	],
	action
) => {
	switch (action.type) {
		case "TOGGLE_POPUP":
			return state.map(popup => (popup.name === action.name ? { ...popup, open: !popup.open } : popup));

		case "REQUEST_FINISHED":
			return state.map(popup => (popup.name === action.name ? { ...popup, loaded: true, response: action.response } : popup));
		default:
			return state;
	}
};

export default popups;
