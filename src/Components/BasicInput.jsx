import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class BasicInput extends Component {
	state = {
		validationFailed: false,
		active: false
	};

	constructor(props) {
		super(props);
		this.input = React.createRef();
	}
	validationFailed = message => {
		let element = this.input.current;
		if (this.state.active === false) {
			element.value = "";
		}
		element.placeholder = element.getAttribute("orig-placeholder") + ": " + message;
		this.setState({
			validationFailed: true
		});
	};
	validationSucess = () => {
		let element = this.input.current;
		element.placeholder = element.getAttribute("orig-placeholder");
		this.setState({
			validationFailed: false
		});
	};
	resetInput = () => {
		this.validateInput(true);
		this.setState({
			active: true
		});
	};
	checkMinLenght = value => {
		if (this.props.minLength && value.length < this.props.minLength) {
			return "input.validation.failedShort";
		} else {
			return true;
		}
	};
	checkMaxLenght = value => {
		if (this.props.maxLength && value.length > this.props.maxLength) {
			return "input.validation.failedLong";
		} else {
			return true;
		}
	};
	checkRequired = value => {
		if (this.props.required === true && value.length === 0) {
			return "input.validation.failedRequired";
		} else {
			return true;
		}
	};
	checkType = value => {
		let type = this.props.type;
		switch (type) {
			case "email":
				var regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;
				if (!regex.test(value.toLowerCase())) {
					return "input.validation.failedEmail";
				} else {
					return true;
				}
			case "tel":
				regex = /[0-9 ]+/i;
				if (!regex.test(value.toLowerCase())) {
					return "input.validation.failedPhone";
				} else {
					return true;
				}

			default:
				return true;
		}
	};
	checkInput = display => {
		const { t } = this.props;
		let value = this.input.current.value;
		let response;
		let valid;

		if (value.length > 0) {
			let typeVal = this.checkType(value);
			if (typeVal !== true) {
				response = typeVal;
			}
			let minVal = this.checkMinLenght(value);
			if (minVal !== true) {
				response = minVal;
			}
			let maxVal = this.checkMaxLenght(value);
			if (maxVal !== true) {
				response = maxVal;
			}
		}
		let reqVal = this.checkRequired(value);
		if (reqVal !== true) {
			response = reqVal;
		}
		if (response) {
			valid = false;
		} else {
			valid = true;
		}
		if (display && !valid) {
			this.validationFailed(t(response));
		} else {
			this.validationSucess();
		}
		this.props.setValue(this.props.name, value, valid);
	};

	validateInput = () => {
		this.checkInput(true);
	};
	componentDidMount = () => {
		let element = this.input.current;
		element.setAttribute("orig-placeholder", element.placeholder);
		this.checkInput(false);
	};

	inputBlur = () => {
		this.setState({
			active: false
		});
		this.validateInput();
	};
	render() {
		return (
			<div className={this.props.textarea === true ? "input-wrapper textarea-wrapper" : "input-wrapper"}>
				{!this.props.textarea && (
					<input
						onKeyUp={this.validateInput}
						ref={this.input}
						onFocus={this.resetInput}
						onBlur={this.inputBlur}
						className={this.state.validationFailed ? "val-failed" : ""}
						name={this.props.name}
						placeholder={this.props.placeholder}
					/>
				)}
				{this.props.textarea === true && (
					<textarea
						onKeyUp={this.validateInput}
						ref={this.input}
						onFocus={this.resetInput}
						onBlur={this.inputBlur}
						className={this.state.validationFailed ? "val-failed" : ""}
						name={this.props.name}
						placeholder={this.props.placeholder}
					/>
				)}

				{this.props.required && <span className="required">*</span>}
			</div>
		);
	}
}

export default withTranslation()(BasicInput);
