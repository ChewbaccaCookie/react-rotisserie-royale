import React, { Component } from "react";

interface FreeImageComponentProps {
	freeImage: FreeImage;
}

class FreeImageComponent extends Component<FreeImageComponentProps> {
	render() {
		const img = this.props.freeImage;
		return (
			<img
				className="free-image"
				src={img.url}
				alt="Custom"
				style={{ width: `${img.width}cm`, height: `${img.height}cm`, top: `${img.position.y}cm`, left: `${img.position.x}cm` }}
			/>
		);
	}
}

export default FreeImageComponent;
