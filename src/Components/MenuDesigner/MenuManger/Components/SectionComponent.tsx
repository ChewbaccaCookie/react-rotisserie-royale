import React, { Component } from "react";
import DishComponent from "./DishComponent";
import DrinkComponent from "./DrinkComponent";
import Convert from "../../../../Utils/Convert";
import MENU_TRANSLATIONS from "../MenuTranslations";

interface SectionProps {
	section: Section;
	langKey: LangKeys;
	divider: MenuCard["globalSettings"]["divider"];
	pageSettings?: PageSettings | undefined;
}

class SectionComponent extends Component<SectionProps> {
	buildClassName = () => {
		let className = "section";
		if (this.props.section.sectionSettings.price) {
			className += " no-item-price";
		}
		if (this.props.section.sectionSettings.priceBorder) {
			className += " price-border";
		}
		if (this.props.section.sectionSettings.disableDrinkAmount) {
			className += " amount-hidden";
		}
		if (this.props.section.isSuccessor) {
			className += " is-successor";
		}

		return className;
	};
	render() {
		const { section, langKey, divider } = this.props;
		return (
			<div className={this.buildClassName()}>
				<SectionTitle title={section.title} langKey={langKey} />
				<div className="items">
					{section.items.map((item, index) => (
						<React.Fragment key={index}>
							<div className="item" style={{ margin: `${this.props.pageSettings?.itemMargin}px 0px` }}>
								{item.type === "dish" && <DishComponent dish={item} langKey={langKey} />}
								{item.type === "drink" && <DrinkComponent drink={item} langKey={langKey} />}
							</div>
							{section.sectionSettings.divider === true && index < section.items.length - 1 && <Divider settings={divider} />}
						</React.Fragment>
					))}
				</div>
				{section.sectionSettings.price && (
					<div className="price">
						<span>{MENU_TRANSLATIONS.perPerson[langKey]}</span> {Convert.numberToPrice(section.sectionSettings.price)}
					</div>
				)}
				{section.sectionSettings.minPersons && (
					<div className="min-persons">{MENU_TRANSLATIONS.menuFor(langKey, section.sectionSettings.minPersons)}</div>
				)}
				{section.sectionSettings.correspondingWines && (
					<div className="corresponding-wine">
						<span>{MENU_TRANSLATIONS.correspondingWine[langKey]} </span>
						<span className="price">{Convert.numberToPrice(section.sectionSettings.correspondingWines)}</span>
					</div>
				)}
				{section.sectionSettings.wineRecommendation && (
					<div className="wine-recommendation">
						<span>{MENU_TRANSLATIONS.wineRecommendation[langKey]}</span>
						<DrinkComponent drink={section.sectionSettings.wineRecommendation} langKey={langKey} />
					</div>
				)}
			</div>
		);
	}
}

const SectionTitle = ({ title, langKey }: { title: Section["title"]; langKey: LangKeys }) => {
	let className = "title";
	if (title.styles) {
		className += " " + title.styles.join(" ");
	}
	return <p className={className}>{title.text[langKey] ?? title.text.de}</p>;
};
const Divider = ({ settings }: { settings: MenuCard["globalSettings"]["divider"] }) => {
	if (settings.image) {
		return (
			<div className="divider">
				{[...Array(settings.repeat)].map((_, i) => (
					<img key={i} alt="divider" src={settings.image?.url} width={settings.image?.width} height={settings.image?.height} />
				))}
			</div>
		);
	} else {
		return (
			<div className="divider">
				{[...Array(settings.repeat)].map((_, i) => (
					<span key={i}>{settings.character}</span>
				))}
			</div>
		);
	}
};
export default SectionComponent;
