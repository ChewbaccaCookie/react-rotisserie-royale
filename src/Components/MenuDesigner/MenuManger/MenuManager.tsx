/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from "react";
import PageComponent from "./Components/PageComponent";
import "./menu-card.scss";
import "./Templates/square-twenty.scss";
import { MENU_TEMPLATES } from "./MenuTemplates";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";

import Axios from "axios";
const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

declare global {
	interface Window {
		lang: "de" | "en" | "fr";
	}
}

interface MenuManagerProps {}

class MenuManager extends Component<MenuManagerProps> {
	state = {
		menu: undefined as MenuCard | undefined,
		selectedPage: 0,
	};
	componentDidMount() {
		this.loadMenuCard();
	}

	loadMenuCard = async () => {
		const response = await Axios.get(process.env.REACT_APP_NEW_BACKEND_ENDPOINT + "/gastro/menu/" + process.env.REACT_APP_MENU_CARD_ID);
		const menu: MenuCard[] = response.data.data;

		this.setState({ menu: menu[0] });
		this.loadTemplate(menu[0].template);
	};

	loadTemplate = (template: MenuCardTemplates) => {
		const fontUrl = MENU_TEMPLATES[template].fontUrl;
		const el = document.querySelector(".menu-card-font");
		// Load necessary fonts
		if (!fontUrl) return;
		if (el) {
			el.setAttribute("href", fontUrl);
		} else {
			const newEl = document.createRange().createContextualFragment(`<link class="menu-card-font" rel="stylesheet" href="${fontUrl}" >`);
			document.querySelector("head")?.append(newEl);
		}
	};

	buildClassName = () => {
		let className = "menu-card";
		const menuCard = this.state.menu;
		if (!menuCard) return "";

		className += ` ${menuCard.template}`;
		return className;
	};

	render() {
		const menu = this.state.menu;

		return (
			<div className="menu-manager">
				<div className={this.buildClassName()}>
					<BindKeyboardSwipeableViews
						disableLazyLoading
						animateHeight
						enableMouseEvents
						index={this.state.selectedPage}
						onChangeIndex={(selectedPage) => this.setState({ selectedPage })}
					>
						{menu &&
							menu.pages.map((page, index) => (
								<PageComponent globalSettings={menu.globalSettings} langKey={window.lang} page={page} key={index} />
							))}
					</BindKeyboardSwipeableViews>
				</div>
				<div className="menu-navigation">
					{[...Array(menu?.pages.length)].map((_x, i) => (
						<span
							key={i}
							onClick={() => this.setState({ selectedPage: i })}
							className={this.state.selectedPage === i ? "page-indicator selected" : "page-indicator"}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default MenuManager;
