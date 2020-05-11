const defaultState = {
	popups: {
		privacy: false,
		impressum: false,
		location: false,
		contact: false,
		responseMessage: false,
		dog: false,
	},
};

const popups = (state = defaultState, action) => {
	switch (action.type) {
		case "SHOW_POPUP":
			state.popups[action.name] = true;
			break;
		case "CLOSE_POPUP":
			state.popups[action.name] = false;
			break;
		default:
			return state;
	}
	return state;
};

export default popups;
