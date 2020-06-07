import React, { Component } from "react";
import { Card } from "@onedash/tools";

interface MenuSidebarProps {}

class MenuSidebar extends Component<MenuSidebarProps> {
	render() {
		return (
			<div className="menu-sidebar">
				<Card title="Neues Element">
					<div className="flex">
						<div className="element">
							<p>Seite</p>
						</div>
						<div className="element">
							<p>Abschnitt</p>
						</div>
						<div className="element">
							<p>Freier Text</p>
						</div>
						<div className="element">
							<p>Gericht</p>
						</div>
						<div className="element">
							<p>Getränk</p>
						</div>
					</div>
				</Card>
				<Card title="Einstellungen"></Card>
			</div>
		);
	}
}

export default MenuSidebar;
