import React, { Component } from "react";
import Convert from "../../../../Utils/Convert";
import MENU_TRANSLATIONS from "../MenuTranslations";

interface DrinkProps {
	drink: Drink;
	langKey: LangKeys;
}
class DrinkComponent extends Component<DrinkProps> {
	buildClassName = () => {
		const className = "drink";
		return className;
	};
	render() {
		const { drink, langKey } = this.props;
		return (
			<div className={this.buildClassName()}>
				<div className="first-block">
					{drink.number && <p className="number">{drink.number}</p>}
					<p className="name">{Convert.TranformNewLine(drink.name[langKey] ?? drink.name.de)}</p>
					<sup className="additive">{Convert.joinTranslations(drink.additives, langKey, ",")}</sup>
					{drink.description && (
						<p className="description">{Convert.TranformNewLine(drink.description[langKey] ?? drink.description.de)}</p>
					)}

					<p className="ingredients">
						{MENU_TRANSLATIONS.contains[langKey]} {Convert.joinTranslations(drink.ingredients, langKey, ", ")}
					</p>
				</div>
				<span className="item-border" />

				<div className="second-block">
					<div className="prices">
						{drink.prices?.map((p, i) => (
							<div className="price-item" key={i}>
								<p className="amount">{p.amount}</p>
								<p className="price">{Convert.numberToPrice(p.price)}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default DrinkComponent;
