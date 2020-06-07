import React, { Component } from "react";
import Convert from "../../../../Utils/Convert";

interface FreeTextProps {
	text: FreeText;
	langKey: LangKeys;
}

class FreeTextComponent extends Component<FreeTextProps> {
	buildClassName = () => {
		const text = this.props.text;
		let className = "free-text";
		if (text.textAlign) {
			className += ` text-${text.textAlign}`;
		}
		if (text.textStyle) {
			text.textStyle.forEach((style) => (className += ` ${style}`));
		}

		return className;
	};
	render() {
		const { text, langKey } = this.props;
		return (
			<p
				className={this.buildClassName()}
				style={{ top: `${text.position.y}cm`, left: `${text.position.x}cm`, fontSize: `${text.textSize}pt` }}>
				{Convert.TranformNewLine(text.text[langKey])}
			</p>
		);
	}
}

export default FreeTextComponent;
