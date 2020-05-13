import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Dialog, Spinner } from "@onedash/tools";
import PopupUtils from "../Utils/PopupUtils";
import "../Styles/ResponseMessage.Popup.scss";
import BrowserHistory from "../Utils/BrowserHistory";

class ResonseMessage extends Component {
	state = {
		response: undefined,
		loaded: false,
		redirectPath: undefined,
	};
	componentDidMount() {
		window.store.subscribe(() => {
			let state = window.store.getState();
			this.setState({ response: state.response, redirectPath: state.redirectPath, loaded: state.response !== undefined ? true : false });
		});
	}
	render() {
		return (
			<Dialog
				onClose={() => {
					PopupUtils.closePopup("responseMessage");
					PopupUtils.clearMessage();
					if (this.state.redirectPath) {
						BrowserHistory.push(this.state.redirectPath);
					}
				}}
				buttons={[]}
				settings={{ showX: false }}
				isOpen={this.props.isOpen}
				name="responseMessage"
				withoutBorder={true}
				className="response-message"
			>
				<div className="response">
					{!this.state.loaded && <Spinner defaultVisible />}
					<svg
						className={this.state.loaded ? "animated successAnimation visible" : "animated successAnimation"}
						xmlns="http://www.w3.org/2000/svg"
						width="120"
						height="120"
						viewBox="0 0 70 70"
					>
						<path
							className="successAnimationResult"
							fill="#D8D8D8"
							d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
						/>
						<circle
							className="successAnimationCircle"
							cx="35"
							cy="35"
							r="24"
							stroke="#979797"
							strokeWidth="2"
							strokeLinecap="round"
							fill="transparent"
						/>
						<polyline className="successAnimationCheck" stroke="#979797" strokeWidth="2" points="23 34 34 43 47 27" fill="transparent" />
					</svg>
					<h1 className={this.state.loaded ? "fadeIn" : ""} dangerouslySetInnerHTML={{ __html: this.state.response }} />
				</div>
			</Dialog>
		);
	}
}

export default withTranslation()(ResonseMessage);
