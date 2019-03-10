import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./Translations/en.json";
import translationDE from "./Translations/de.json";

// the translations
const resources = {
	en: {
		translation: JSON.parse(JSON.stringify(translationEN).replace(/(\\+n)/g, "<br/>"))
	},
	de: {
		translation: JSON.parse(JSON.stringify(translationDE).replace(/(\\+n)/g, "<br/>"))
	}
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: "de",

		keySeparator: false, // we do not use keys in form messages.welcome

		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export default i18n;
