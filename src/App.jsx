import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withTranslation } from "react-i18next";
import HomePage from "./Pages/HomePage";

import "./Styles/Reset.scss";
import "./Styles/ToolsOverwrite.scss";
import "./Styles/MainStyle.scss";
import Navigation from "./Components/Navigation";
import RotisserieRoyalePage from "./Pages/RotisserieRoyalePage";
import Privacy from "./Popups/Privacy";
import { createStore } from "redux";
import popupRededucer from "./Reducers/PopupsReducer";
import Impressum from "./Popups/Impressum";
import Location from "./Popups/Location";
import Contact from "./Popups/Contact";
import GaestehausAmSchlossberg from "./Pages/GaestehausAmSchlossberg";
import Corona from "./Pages/Corona";
import Dogs from "./Popups/Dogs";
import ResponseMessage from "./Popups/ResponseMessage";
import PageNotFound from "./Components/404";
import { StyleLoader } from "@onedash/tools";
import ManageCorona from "./Pages/ManageCorona";

const store = createStore(popupRededucer);
window.store = store;

class App extends Component {
	state = {
		popups: {},
	};
	componentDidMount() {
		window.store.subscribe(() => {
			let state = window.store.getState();
			this.setState({ popups: state.popups });
		});
	}
	render() {
		return (
			<div>
				<StyleLoader>
					<Navigation />

					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/Rotisserie-Royale" component={RotisserieRoyalePage} />
						<Route exact path="/Gästehaus-am-Schlossberg" component={GaestehausAmSchlossberg} />
						<Route exact path="/Rotisserie-Royale/corona/:tableNum" component={Corona} />
						<Route exact path="/Rotisserie-Royale/corona" component={Corona} />
						<Route exact path="/Rotisserie-Royale/manage-corona" component={ManageCorona} />

						<Route component={PageNotFound} />
					</Switch>
					<section className="popups">
						<Privacy isOpen={this.state.popups.privacy} />
						<Impressum isOpen={this.state.popups.impressum} />
						<Location isOpen={this.state.popups.location} />
						<Contact isOpen={this.state.popups.contact} />
						<Dogs isOpen={this.state.popups.dogs} />
						<ResponseMessage isOpen={this.state.popups.responseMessage} />
					</section>
				</StyleLoader>
			</div>
		);
	}
}

export default withTranslation()(App);
