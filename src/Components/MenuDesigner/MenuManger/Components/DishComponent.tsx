import React, { Component } from "react";
import Convert from "../../../../Utils/Convert";
import MENU_TRANSLATIONS from "../MenuTranslations";

interface DishProps {
	dish: Dish;
	langKey: LangKeys;
}

class DishComponent extends Component<DishProps> {
	buildClassName = () => {
		const className = "dish";
		return className;
	};
	render() {
		const { dish, langKey } = this.props;
		return (
			<div className={this.buildClassName()}>
				<div className="first-block">
					<p className="name">{Convert.TranformNewLine(dish.name[langKey] ?? dish.name.de)}</p>
					<sup className="additive">{Convert.joinTranslations(dish.additives, langKey, ",")}</sup>
					{dish.description && (
						<p className="description">{Convert.TranformNewLine(dish.description[langKey] ?? dish.description.de)}</p>
					)}

					<p className="ingredients">
						{MENU_TRANSLATIONS.contains[langKey]} {Convert.joinTranslations(dish.ingredients, langKey, ", ")}
					</p>
				</div>
				<span className="item-border" />
				<div className="second-block">
					<p className="price">{Convert.numberToPrice(dish.price)}</p>
				</div>
			</div>
		);
	}
}

export default DishComponent;
