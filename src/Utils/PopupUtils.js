export default class PopupUtils {
	static showPopup = (popupName) => {
		window.store.dispatch({ type: "SHOW_POPUP", name: popupName });
	};
	static closePopup = (popupName) => {
		window.store.dispatch({ type: "CLOSE_POPUP", name: popupName });
	};
}
