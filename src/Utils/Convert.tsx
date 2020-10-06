import React from "react";

export default class Convert {
	public static numberToPrice = (price: number | undefined): string => {
		if (price) {
			return String(Number(price).toFixed(2)).replace(".", ",") + "€";
		} else {
			return "0,00€";
		}
	};

	public static TranformNewLine = (text?: string) => {
		if (!text) return;
		return text.split("\n").map((item, i) => (
			<React.Fragment key={i}>
				{item}
				<br />
			</React.Fragment>
		));
	};

	public static joinTranslations = (translations: TranslationItem[], langKey: LangKeys, joinString: string) => {
		const textArr: (string | undefined)[] = [];
		translations.forEach((t) => {
			textArr.push(t[langKey]);
		});
		return textArr.join(joinString);
	};
}
