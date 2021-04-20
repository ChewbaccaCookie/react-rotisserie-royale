import React from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import BrowserHistory from "./Utils/BrowserHistory";
import App from "./App";
import "./i18n";
import "./Styles/onedash-forms.sass";
import "./Styles/onedash-dialog.sass";

ReactDOM.render(
	<HashRouter history={BrowserHistory}>
		<App />
	</HashRouter>,
	document.getElementById("root")
);
