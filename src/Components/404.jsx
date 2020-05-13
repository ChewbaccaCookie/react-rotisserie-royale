import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";

class PageNotFound extends Component {
	render() {
		return <Redirect to="/" />;
	}
}

export default withRouter(PageNotFound);
