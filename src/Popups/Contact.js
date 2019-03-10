import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Popup from "../Components/Popup";
import BasicInput from "../Components/BasicInput";
import $ from "jquery";
class Contact extends Component {
	state = {
		inputValues: [],
		disabled: true
	};

	setInputValue = (name, value, valid) => {
		let inputValues = this.state.inputValues;
		let obj = inputValues.find(x => x.name === name);

		if (obj) {
			obj.valid = valid;
			obj.value = value;
		} else {
			obj = {
				name,
				valid,
				value
			};
			inputValues.push(obj);
		}
		this.setState(
			{
				inputValues
			},
			this.checkValidationStatus
		);
	};
	checkValidationStatus = () => {
		let valid = true;
		this.state.inputValues.forEach(element => {
			if (element.valid === false) {
				valid = false;
			}
		});
		this.setState({
			disabled: !valid
		});
	};
	sendContactRequest = e => {
		e.preventDefault();
		$(".popups input").each((index, element) => {
			element.value = "";
		});
		this.checkValidationStatus();
	};

	render() {
		const { t } = this.props;
		return (
			<Popup name="contact" title={t("footer.contact")} type="small-popup">
				<form onSubmit={this.sendContactRequest} className="basicInput">
					<BasicInput type="text" name="contact-name" minLength="4" required={true} setValue={this.setInputValue} placeholder={t("input.basic.name")} />
					<BasicInput type="email" name="contact-email" required={true} setValue={this.setInputValue} placeholder={t("input.basic.email")} />
					<BasicInput type="tel" name="contact-phone" setValue={this.setInputValue} placeholder={t("input.basic.phone")} />
					<BasicInput type="text" name="contact-subject" required={true} setValue={this.setInputValue} placeholder={t("input.basic.subject")} />
					<BasicInput textarea={true} type="text" name="contact-message" required={true} setValue={this.setInputValue} placeholder={t("input.basic.message")} />
					<button disabled={this.state.disabled}>{t("input.basic.message_submit")}</button>
				</form>
			</Popup>
		);
	}
}

export default withTranslation()(Contact);
