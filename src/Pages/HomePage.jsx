import React from "react";
import { useTranslation } from "react-i18next";
import "react-awesome-slider/dist/styles.css";
import "../Styles/Pages.Home.scss";
import { Link } from "react-router-dom";
import BackgroundSlider from "../Components/BackgroundSlider";

const backgroundImages = [
	{
		src: "/Assets/MinifiedImages/home-slider-1-min.jpg",
	},
	{
		src: "/Assets/MinifiedImages/home-slider-2-min.jpg",
	},
	{
		src: "/Assets/MinifiedImages/home-slider-3-min.jpg",
	},
	{
		src: "/Assets/MinifiedImages/home-slider-4-min.jpg",
	},
];

const HomePage = () => {
	const { t } = useTranslation();
	return (
		<div className="HomePage">
			<BackgroundSlider images={backgroundImages} autoplay />
			<div id="logo">
				<img alt="Logo - Rotisserie Royale / Gästehaus am Schlossberg" src="/Assets/Slider/logo.png" />
			</div>

			<div id="welcome-text">
				<h1 dangerouslySetInnerHTML={{ __html: t("pages.home.welcome_text") }} />
				<div id="btns">
					<Link to="/rotisserie-royale" className="btn">
						<span className="arrow-wrapper">
							<span className="arrow" />
						</span>
						{t("basic.rotisserie_royale")}
					</Link>
					<Link to="/gaestehaus-am-schlossberg" className="btn">
						<span className="arrow-wrapper">
							<span className="arrow" />
						</span>
						{t("basic.gaestehaus_am_schlossberg")}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
