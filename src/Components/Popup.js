import React, { Component } from "react";
import "../Styles/Component.Popup.scss";

class Popup extends Component {
	state = {
		popupOpen: false,
		bodyScrollDisabled: false
	};
	onKeyDown = e => {
		if (this.state.popupOpen) {
			if (e.keyCode === 27) {
				this.closePopup();
			}
		}
	};
	closePopup = () => {
		window.store.dispatch({ type: "TOGGLE_POPUP", name: this.props.name });
	};
	toggleBodyScroll = () => {
		if (this.state.bodyScrollDisabled) {
			document.body.style.overflowY = "auto";
		} else {
			document.body.style.overflowY = "hidden";
		}
		this.setState({
			bodyScrollDisabled: !this.state.bodyScrollDisabled
		});
	};
	updatedPopupStore = () => {
		var obj = window.store.getState().find(x => x.name === this.props.name);
		if (obj.open !== this.state.popupOpen) {
			//If mobile link is available => Redirect
			if (this.props.mobileLink && window.innerWidth < 720) {
				window.location = this.props.mobileLink;
			} else {
				this.toggleBodyScroll();

				this.setState({
					popupOpen: obj.open
				});
			}
		}
	};
	updateOpenState = () => {
		window.store.subscribe(() => {
			this.updatedPopupStore();
		});
	};
	componentDidMount = () => {
		this.updatedPopupStore();
	};
	componentWillMount = () => {
		this.updateOpenState();
		document.addEventListener("keydown", this.onKeyDown, false);
	};
	componentWillUnmount = () => {
		document.removeEventListener("keydown", this.onKeyDown, false);
	};
	render() {
		return (
			<div className={this.state.popupOpen ? "popup-container popupOpen" : "popup-container"}>
				<div className="popup-background" onClick={this.closePopup} />
				<div className={this.state.popupOpen ? "popup-close shown" : "popup-close"} onClick={this.closePopup}>
					<div className="close-btn-wrapper">
						<span className="left">
							<span className="circle-left" />
							<span className="circle-right" />
						</span>
						<span className="right">
							<span className="circle-left" />
							<span className="circle-right" />
						</span>
					</div>
				</div>
				<article className={this.props.withoutBorder === true ? "detailed-popup without-border" : "detailed-popup"}>
					<div className={`popup-wrapper ${this.props.type}`}>
						<h1 className="popup-title">{this.props.title}</h1>
						<div className="popup-content">{this.props.children}</div>
					</div>
				</article>
			</div>
		);
	}
}

export default Popup;
