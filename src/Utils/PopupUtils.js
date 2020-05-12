export default class PopupUtils {
	static showPopup = (popupName) => {
		window.store.dispatch({ type: "SHOW_POPUP", name: popupName });
	};
	static closePopup = (popupName) => {
		window.store.dispatch({ type: "CLOSE_POPUP", name: popupName });
	};

	static setResponseMessage = (responseMessage, toPathOnClose) => {
		window.store.dispatch({ type: "RESPONSE_MESSAGE", message: responseMessage, path: toPathOnClose });
	};
	static clearMessage = () => {
		window.store.dispatch({ type: "RESPONSE_MESSAGE", message: undefined, path: undefined });
	};
}
