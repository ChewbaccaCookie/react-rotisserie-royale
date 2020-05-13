import React from "react";
import { Router } from "react-router-dom";
import BrowserHistory from "./Utils/BrowserHistory";
import ReactDOM from "react-dom";
import App from "./App";
import "./i18n";

ReactDOM.render(
	<Router history={BrowserHistory}>
		<App />
	</Router>,
	document.getElementById("root")
);
