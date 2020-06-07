import React, { Component } from "react";
import PAGE_LAYOUTS from "./Layouts/PageLayouts";
import FreeImageComponent from "./FreeImageComponent";
import FreeTextComponent from "./FreeTextComponent";

interface PageProps {
	page: Page;
	langKey: LangKeys;
	globalSettings: MenuCard["globalSettings"];
}

class PageComponent extends Component<PageProps> {
	getPageStyle = () => {
		const style: React.CSSProperties = {};
		const gs = this.props.globalSettings;
		if (gs.pagePadding) {
			const padding = gs.pagePadding;
			style.padding = `${padding.top}cm ${padding.right}cm ${padding.bottom}cm ${padding.left}cm`;
			style.height = `calc(100% - ${padding.top + padding.bottom}cm)`;
		}
		if (gs.basisFontSize) {
			style.fontSize = `${gs.basisFontSize}pt`;
		}
		return style;
	};

	buildClassName = () => {
		return `page ${this.props.page.layout}`;
	};
	render() {
		const { page, langKey, globalSettings } = this.props;
		const Layout = PAGE_LAYOUTS[page.layout];
		if (!Layout) {
			console.error(`Layout with the name ${page.layout} is undefined`);
			return <></>;
		}
		return (
			<div className="page-wrapper">
				<div className={this.buildClassName()}>
					{globalSettings.watermark && (
						<div
							className="watermark"
							style={{
								backgroundImage: `url(${globalSettings.watermark.url})`,
								transform: `scale(${globalSettings.watermark.size ? globalSettings.watermark.size / 100 : 1})`,
								opacity: globalSettings.watermark.opacity ? globalSettings.watermark.opacity / 100 : 1,
							}}
						></div>
					)}
					{this.props.page.pageSettings?.name && (
						<h2 className="page-title">{this.props.page.pageSettings.name[langKey] ?? this.props.page.pageSettings.name.de}</h2>
					)}
					<div style={this.getPageStyle()} className="columns">
						<Layout page={page} pageSettings={page.pageSettings} langKey={langKey} globalSettings={globalSettings} />
					</div>
					<div className="free-images">
						{page.freeImages?.map((img, index) => (
							<FreeImageComponent key={index} freeImage={img} />
						))}
					</div>
					<div className="free-texts">
						{page.freeTexts?.map((text, index) => (
							<FreeTextComponent langKey={langKey} key={index} text={text} />
						))}
					</div>
				</div>
			</div>
		);
	}
}

export default PageComponent;
