const defaultState = {
	popups: {
		privacy: false,
		impressum: false,
		location: false,
		contact: false,
		responseMessage: false,
		dog: false,
	},
	response: undefined,
	redirectPath: undefined,
};

const popups = (state = defaultState, action) => {
	switch (action.type) {
		case "SHOW_POPUP":
			state.popups[action.name] = true;
			break;
		case "CLOSE_POPUP":
			state.popups[action.name] = false;
			break;
		case "RESPONSE_MESSAGE":
			state.response = action.message;
			state.redirectPath = action.path;
			break;
		default:
			return state;
	}
	return state;
};

export default popups;
