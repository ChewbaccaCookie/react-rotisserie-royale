import React from "react";
import { Router } from "react-router-dom";
import ReactDOM from "react-dom";
import BrowserHistory from "./Utils/BrowserHistory";
import App from "./App";
import "./i18n";
import "./Styles/onedash-forms.sass";
import "./Styles/onedash-dialog.sass";

ReactDOM.render(
	<Router history={BrowserHistory}>
		<App />
	</Router>,
	document.getElementById("root")
);
