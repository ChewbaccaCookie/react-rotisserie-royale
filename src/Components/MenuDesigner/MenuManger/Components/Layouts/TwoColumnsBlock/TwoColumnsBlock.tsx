import React from "react";
import Layout from "../Layout";
import SectionComponent from "../../SectionComponent";
import "./TwoColumnsBlock.scss";

class TwoColumnsBlock extends Layout {
	render() {
		const { page, langKey, globalSettings } = this.props;

		return (
			<>
				<div className={this.buildColumnClassName(0)}>
					{page.columns[0].map((section, index) => (
						<SectionComponent
							pageSettings={this.props.pageSettings}
							key={index}
							section={section}
							langKey={langKey}
							divider={globalSettings.divider}
						/>
					))}
				</div>
				<div className={this.buildColumnClassName(1)}>
					{page.columns[1] &&
						page.columns[1].map((section, index) => (
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

export default TwoColumnsBlock;
