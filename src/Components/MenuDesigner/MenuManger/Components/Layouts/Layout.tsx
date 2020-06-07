import { Component } from "react";

interface LayoutProps {
	page: Page;
	langKey: LangKeys;
	globalSettings: MenuCard["globalSettings"];
	pageSettings?: PageSettings | undefined;
}

abstract class Layout extends Component<LayoutProps> {
	buildColumnClassName = (column: number, classNames = "") => {
		const pageSettings = this.props.page.pageSettings;
		let className = `column column-${column} ${classNames}`;
		if (pageSettings?.columnSettings && pageSettings?.columnSettings[column]) {
			className += ` vertical-${pageSettings?.columnSettings[column].verticalAlign}`;
		}
		return className;
	};
}

export default Layout;
