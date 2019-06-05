import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withTranslation } from "react-i18next";
import HomePage from "./Pages/HomePage";

import "./Styles/Reset.scss";
import "./Styles/MainStyle.scss";
import "./Styles/Input.scss";
import Navigation from "./Components/Navigation";
import RotisserieRoyalePage from "./Pages/RotisserieRoyalePage";
import Privacy from "./Popups/Privacy";
import { createStore } from "redux";
import popupRededucer from "./Reducers/PopupsReducer";
import Impressum from "./Popups/Impressum";
import Location from "./Popups/Location";
import Contact from "./Popups/Contact";
import GaestehausAmSchlossberg from "./Pages/GaestehausAmSchlossberg";
import Dogs from "./Popups/Dogs";
import ResponseMessage from "./Popups/ResponseMessage";
import PageNotFound from "./Components/404";

const store = createStore(popupRededucer);
window.store = store;

class App extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/Rotisserie-Royale" component={RotisserieRoyalePage} />
					<Route exact path="/Gästehaus-am-Schlossberg" component={GaestehausAmSchlossberg} />

					<Route component={PageNotFound} />
				</Switch>
				<section className="popups">
					<Privacy />
					<Impressum />
					<Location />
					<Contact />
					<Dogs />
					<ResponseMessage />
				</section>
			</div>
		);
	}
}

export default withTranslation()(App);
