import React from "react";

export default class Convert {
	public static numberToPrice = (price: number | undefined): string => {
		if (price) {
			return `${String(Number(price).toFixed(2)).replace(".", ",")}€`;
		}
		return "0,00€";
	};

	public static TranformNewLine = (text?: string) => {
		if (!text) return;
		return text.split("\n").map((item, i) => (
			// eslint-disable-next-line react/no-array-index-key
			<React.Fragment key={i}>
				{item}
				<br />
			</React.Fragment>
		));
	};
}
