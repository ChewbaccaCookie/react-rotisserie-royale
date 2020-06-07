import React from "react";
import "./CenteredPriceBottom.scss";
import SectionComponent from "../../SectionComponent";
import { toOneColumn } from "../PageLayouts";
import Layout from "../Layout";

class CenteredPriceBottom extends Layout {
	render() {
		const { page, langKey, globalSettings } = this.props;

		return (
			<>
				<div className={this.buildColumnClassName(0, "text-center horizontal-center")}>
					{toOneColumn(page.columns).map((section, index) => (
						<SectionComponent
							pageSettings={this.props.pageSettings}
							key={index}
							section={section}
							langKey={langKey}
							divider={globalSettings.divider}
						/>
					))}
				</div>
			</>
		);
	}
}

export default CenteredPriceBottom;
