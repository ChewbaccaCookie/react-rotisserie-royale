import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const BackgroundSlider = ({ images }) => {
	return (
		<div className="backgroundSlider">
			<div className="slider-overlay" />
			<AutoplaySlider interval={6000} bullets={false} organicArrows={false} fillParent play>
				{images.map((image) => (
					<div key={image.src} data-src={image.src} />
				))}
			</AutoplaySlider>
		</div>
	);
};

export default BackgroundSlider;
