import React from "react";
import "./Spinner.scss";

const Spinner = (props) => {
	const color = props.color ?? "var(--highlight)";
	const divStyle = { backgroundColor: color };

	return (
		<div className="spinner dot-spinner">
			<div style={divStyle} className="bounce1" />
			<div style={divStyle} className="bounce2" />
			<div style={divStyle} className="bounce3" />
		</div>
	);
};

export default Spinner;
