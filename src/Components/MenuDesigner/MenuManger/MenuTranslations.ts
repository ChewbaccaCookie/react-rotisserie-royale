const MENU_TRANSLATIONS = {
	contains: {
		de: "Enthält:",
		en: "Contains:",
		fr: "",
	},
	perPerson: {
		de: "Pro Person ",
		en: "Per person",
		fr: "",
	},
	menuFor: (lang: LangKeys, personNum: number) => {
		switch (lang) {
			case "de":
				return `Ab ${personNum} Personen`;
			case "en":
				return `From ${personNum} persons`;
		}
	},
	correspondingWine: {
		de: "Auf Wunsch servieren wir Ihnen zu jedem Gang ein Glas ausgesuchten Wein",
		en: "On request we serve a glass of selected wine with each course",
		fr: "",
	},
	wineRecommendation: {
		de: "Unsere Weinempfehlung",
		en: "Our wine recommendation",
		fr: "",
	},
};
export default MENU_TRANSLATIONS;
