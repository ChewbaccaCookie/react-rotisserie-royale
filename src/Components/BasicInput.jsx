import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { RangeDatePicker, DatePicker } from "@y0c/react-datepicker";
import moment from "moment";
import "dayjs/locale/de";
import "dayjs/locale/en";

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
		if (element) {
			element.placeholder = element.getAttribute("orig-placeholder") + ": " + message;
		}
		this.setState({
			validationFailed: true
		});
	};
	validationSucess = () => {
		let element = this.input.current;
		if (element) {
			element.placeholder = element.getAttribute("orig-placeholder");
		}

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
			case "number":
				regex = /[0-9]+/i;
				if (!regex.test(value.toLowerCase())) {
					return "input.validation.failedNumber";
				} else {
					return true;
				}
			default:
				return true;
		}
	};
	checkInput = (display, value, name) => {
		const { t } = this.props;
		if (this.input.current || value !== undefined) {
			if (value === undefined) {
				value = this.input.current.value;
			}

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
			if (name) {
				this.props.setValue(name, value, valid);
			} else {
				this.props.setValue(this.props.name, value, valid);
			}
		}
	};

	validateInput = () => {
		this.checkInput(true);
	};
	componentDidMount = () => {
		let element = this.input.current;
		if (element) {
			element.setAttribute("orig-placeholder", element.placeholder);
		}
		switch (this.props.type) {
			case "dateRange":
				this.checkInput(false, "", this.props.name1);
				this.checkInput(false, "", this.props.name2);
				break;
			case "date":
				this.checkInput(false, moment().format(this.props.dateFormat), this.props.name);
				break;
			default:
				this.checkInput(false);
				break;
		}
	};

	inputBlur = () => {
		this.setState({
			active: false
		});
		this.validateInput();
	};
	dateRangeChange = (firstDate, secondDate) => {
		const t = this.props.t;

		if (firstDate) {
			this.checkInput(true, moment(firstDate, t("input.basic.dateFormat")).format(this.props.dateFormat), this.props.name1);
		}
		if (secondDate) {
			this.checkInput(true, moment(secondDate, t("input.basic.dateFormat")).format(this.props.dateFormat), this.props.name2);
		}
	};
	dateChange = (tmp, date) => {
		const t = this.props.t;
		this.checkInput(true, moment(date, t("input.basic.dateFormat")).format(this.props.dateFormat), this.props.name);
	};
	basicDateChange = e => {
		let date = moment(e.target.value).format("L");

		this.checkInput(true, date, this.props.name);
	};

	renderType = () => {
		let el;
		let width = window.innerWidth;
		switch (this.props.type) {
			case "dateRange":
				let monthCount = 2;
				if (width < 720) {
					monthCount = 1;
				}

				console.log(window.lang);

				el = (
					<RangeDatePicker
						startPlaceholder={this.props.placeholder1}
						endPlaceholder={this.props.placeholder2}
						dateFormat={this.props.dateFormat}
						locale={window.lang}
						onChange={this.dateRangeChange}
						showMonthCnt={monthCount}
					/>
				);
				break;
			case "date":
				if (window.innerWidth > 720) {
					el = (
						<DatePicker
							placeholder={this.props.placeholder}
							dateFormat={this.props.dateFormat}
							locale={window.lang}
							onChange={this.dateChange}
						/>
					);
				} else {
					el = <input placeholder={this.props.placeholder} name={this.props.name} type="date" onChange={this.basicDateChange} />;
				}

				break;

			case "textarea":
				el = (
					<textarea
						onKeyUp={this.validateInput}
						ref={this.input}
						onFocus={this.resetInput}
						onBlur={this.inputBlur}
						className={this.state.validationFailed ? "val-failed" : ""}
						name={this.props.name}
						placeholder={this.props.placeholder}
					/>
				);
				break;
			default:
				el = (
					<input
						lang={window.lang}
						type={this.props.type}
						onKeyUp={this.validateInput}
						ref={this.input}
						onFocus={this.resetInput}
						onBlur={this.inputBlur}
						className={this.state.validationFailed ? "val-failed" : ""}
						name={this.props.name}
						placeholder={this.props.placeholder}
					/>
				);
				break;
		}

		return el;
	};
	getWrapperClass = () => {
		let cl = "input-wrapper";
		switch (this.props.type) {
			case "textarea":
				cl += " textarea-wrapper";
				break;
			case "dateRange":
				cl += " dateRange-wrapper";
				break;
			default:
				break;
		}
		return cl;
	};
	getRequired = () => {
		let el;
		if (this.props.required) {
			switch (this.props.type) {
				case "dateRange":
					el = (
						<div>
							<span className="required required-date1">*</span>
							<span className="required required-date2">*</span>
						</div>
					);
					break;
				default:
					el = <span className="required">*</span>;
					break;
			}
		}
		return el;
	};

	render() {
		return (
			<div className={this.getWrapperClass()}>
				{this.renderType()}
				{this.getRequired()}
			</div>
		);
	}
}

export default withTranslation()(BasicInput);
