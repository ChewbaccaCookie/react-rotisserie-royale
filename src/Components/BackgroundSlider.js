import React, { Component } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import $ from "jquery";

class BackgroundSlider extends Component {
	autoplay = () => {
		$(".aws-sld__controls__arrow-right").click();
		setTimeout(this.autoplay, 9000);
	};
	componentDidMount = () => {
		if (this.props.autoplay === true) {
			setTimeout(this.autoplay, 9000);
		}
	};

	render() {
		return (
			<div className="backgroundSlider">
				<div className="slider-overlay" />
				<AwesomeSlider>
					{this.props.images.map(image => (
						<div key={image.src} data-src={image.src} />
					))}
				</AwesomeSlider>
			</div>
		);
	}
}

export default BackgroundSlider;
