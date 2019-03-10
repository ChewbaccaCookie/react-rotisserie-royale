import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import "../Styles/Pages.Home.scss";
import { Link } from "react-router-dom";
import BackgroundSlider from "../Components/BackgroundSlider";

let backgroundImages = [
	{
		src: "/Assets/MinifiedImages/home-slider-1-min.jpg"
	},
	{
		src: "/Assets/MinifiedImages/home-slider-2-min.jpg"
	},
	{
		src: "/Assets/MinifiedImages/home-slider-3-min.jpg"
	},
	{
		src: "/Assets/MinifiedImages/home-slider-4-min.jpg"
	}
];

class HomePage extends Component {
	render() {
		const { t } = this.props;
		return (
			<div className="HomePage">
				<BackgroundSlider images={backgroundImages} autoplay={true} />
				<div id="logo" />

				<div id="welcome-text">
					<h1 dangerouslySetInnerHTML={{ __html: t("pages.home.welcome_text") }} />
					<div id="btns">
						<Link to="Rotisserie-Royale" className="btn">
							<span className="arrow-wrapper">
								<span className="arrow" />
							</span>
							{t("basic.rotisserie_royale")}
						</Link>
						<Link to="Gästehaus-am-Schlossberg" className="btn">
							<span className="arrow-wrapper">
								<span className="arrow" />
							</span>
							{t("basic.gaestehaus_am_schlossberg")}
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default withTranslation()(HomePage);
