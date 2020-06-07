type MenuCardTemplates = "square-twenty";
type PageLayouts = "centered-price-bottom" | "centered-block" | "centered-price-right" | "two-columns-block" | "two-columns-price-bottom";
type TextStyle = "bold" | "italic" | "underline";
type TextAlign = "left" | "right" | "center";
type LangKeys = "de" | "en" | "fr";
interface TranslationItem {
	de: string;
	fr?: string;
	en?: string;
}
interface MenuCardSettings {
	/**
	 * Signalizes wether to show a page number on each page
	 */
	showPageNum?: boolean;

	/**
	 * Flag whether to show a number before a item
	 * @example "1. Geschmorter Schweinebraten ..."
	 */
	showItemNum?: boolean;

	/**
	 * Watermark of all pages
	 */
	watermark?: {
		/**
		 * URL to the watermark image
		 */
		url: string;

		/**
		 * Opacity of the watermark
		 */
		opacity?: number;

		/**
		 * Size of the watermark
		 */
		size?: number;
	};

	divider: {
		/**
		 * Optional URL to a divider image
		 */
		image?: {
			url: string;
			height?: number;
			width?: number;
		};

		/**
		 * Character which should be printed as divider (unless a url is given).
		 */
		character: string;

		/**
		 * How often should the divider be repeated?
		 */
		repeat: number;
	};

	/**
	 * Basic font size. All the texts depend on this font size. Font size is in pt!
	 */
	basisFontSize?: number;

	/**
	 * Adjustment of the padding of all pages in cm!
	 */
	pagePadding?: {
		top: number;
		left: number;
		right: number;
		bottom: number;
	};
}

interface PageSettings {
	/**
	 * Optional name of a page.
	 * @example "Essen"
	 */
	name?: TranslationItem;

	columnSettings?: {
		[column: number]: {
			verticalAlign: "top" | "center" | "bottom";
		};
	};

	/**
	 * Margin for all items of a site. Use this to fill the page
	 */
	itemMargin?: number;
}

interface SectionSettings {
	/**
	 * Used to disable the amount for drinks
	 */
	disableDrinkAmount?: boolean;

	/**
	 * Show a divider for each item
	 */
	divider?: boolean;
	/**
	 * Optional price of a section. This is interesting when you have a menu.
	 */
	price?: number;

	/**
	 * Number of persons which are the minimum users
	 */
	minPersons?: number;

	/**
	 * Optional wine recommendation which should be printed at the end of the section.
	 */
	wineRecommendation?: Drink;

	/**
	 * Price for corresponding wines at this secion.
	 * @example "Preis pro Person: 16,50€"
	 */
	correspondingWines?: number;

	/**
	 * Defines whether to show a border between item name and item price(s)
	 */
	priceBorder?: boolean;
}

interface FreeText {
	text: TranslationItem;
	position: {
		x: number;
		y: number;
	};
	textStyle?: TextStyle[];
	textAlign?: TextAlign;

	/**
	 * Text size in pt
	 */
	textSize: number;
}
interface FreeImage {
	position: {
		x: number;
		y: number;
	};
	url: string;
	width?: number;
	height?: number;
}
interface MenuCard {
	/**
	 * ID of the template
	 */
	id: string;

	/**
	 * Main template of the menu card (e.g. A4)
	 */
	template: MenuCardTemplates;

	/**
	 * Name of the menu.
	 * @example "Sommerkarte"
	 */
	name: string;

	/**
	 * Description of the menu
	 * @example "Speisekarte für den Sommer"
	 */
	description: string;

	/**
	 * Global settings for all the pages and items.
	 */
	globalSettings: MenuCardSettings;

	/**
	 * Array of all pages of this site.
	 */
	pages: Page[];

	thumbnailUrl?: string;
}

interface Page {
	/**
	 * Layout ID
	 * @example "centered-price-bottom"
	 */
	layout: PageLayouts;

	/**
	 * Additional Page Settings
	 */
	pageSettings?: PageSettings;

	/**
	 * Sections of this page.
	 */
	columns: Section[][];

	/**
	 * Free Texts which should be printed on the page
	 */
	freeTexts?: FreeText[];
	/**
	 * Free Images which should be printed on the page
	 */
	freeImages?: FreeImage[];
}

interface Section {
	/**
	 * Title of the secion.
	 */
	title: {
		text: TranslationItem;
		/**
		 * Optional title style. Default is bold and underlined
		 */
		styles?: TextStyle[];
	};

	/**
	 * Is a flag which indicates whether this
	 */
	isSuccessor?: boolean;

	/**
	 * Section settings which defines some section behavior
	 */
	sectionSettings: SectionSettings;

	/**
	 * Array of dishes or drinks for this section.
	 */
	items: (Dish | Drink)[];
}

interface Dish {
	type: "dish";
	/**
	 * Name of the Dish
	 * @example "Schweinenackensteak an ..."
	 */
	name: TranslationItem;

	/**
	 * Optional description of the dish.
	 * @example "Ein traditionelles Gericht aus Norditalien, welches ... "
	 */
	description?: TranslationItem;

	/**
	 * Optional price of the dish. Default a price should be used.
	 * For example a menu does not use prices for each
	 */
	price?: number;

	/**
	 * Optional persons number for this dish.
	 * @example "Für 2 Personen"
	 */
	personsNum?: number;

	/**
	 * "Zusatzstoffe"
	 *  @example "Sulfite, ..."
	 */
	additives: Additive[];

	/**
	 * "Inhaltsstoffe"
	 * @example "Weizen, Krustentiere, ..."
	 */
	ingredients: Ingredient[];
}

interface Drink {
	type: "drink";
	/**
	 * Name of the beverage.
	 * @example "Coca Cola"
	 */

	/**
	 * Number of the drink which should be showed
	 */
	number?: number;

	name: TranslationItem;

	/**
	 * Optional description of the beverage
	 * @example "Aromatisierter schwarzer Tee. Earl Grey ist die beliebteste aromatisierte Teequalität weltweit"
	 */
	description?: TranslationItem;

	/**
	 * Prices for the beverage, depending of the amount
	 * @example "1Ltr. => 17,50€"
	 */
	prices?: {
		amount: string;
		price: number;
	}[];

	/**
	 * "Zusatzstoffe"
	 *  @example "Sulfite, ..."
	 */
	additives: Additive[];

	/**
	 * "Inhaltsstoffe"
	 * @example "Weizen, Krustentiere, ..."
	 */
	ingredients: Ingredient[];
}
type Ingredient = TranslationItem;
type Additive = TranslationItem;
