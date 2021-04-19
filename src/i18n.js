import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./Translations/en.json";
import translationDE from "./Translations/de.json";

// the translations
const resources = {
	en: {
		translation: JSON.parse(JSON.stringify(translationEN).replace(/(\\+n)/g, "<br/>")),
	},
	de: {
		translation: JSON.parse(JSON.stringify(translationDE).replace(/(\\+n)/g, "<br/>")),
	},
};

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		load: "languageOnly",
		supportedLngs: ["de", "en"],
		fallbackLng: "en",

		resources,
		keySeparator: false, // we do not use keys in form messages.welcome
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
