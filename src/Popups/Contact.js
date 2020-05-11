import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class Contact extends Component {
	state = {
		inputValues: [],
		disabled: true,
	};

	setInputValue = (name, value, valid) => {
		let inputValues = this.state.inputValues;
		let obj = inputValues.find((x) => x.name === name);

		if (obj) {
			obj.valid = valid;
			obj.value = value;
		} else {
			obj = {
				name,
				valid,
				value,
			};
			inputValues.push(obj);
		}
		this.setState(
			{
				inputValues,
			},
			this.checkValidationStatus
		);
	};
	checkValidationStatus = () => {
		let valid = true;
		this.state.inputValues.forEach((element) => {
			if (element.valid === false) {
				valid = false;
			}
		});
		this.setState({
			disabled: !valid,
		});
		return valid;
	};
	sendContactRequest = (e) => {
		/*e.preventDefault();
		if (this.checkValidationStatus()) {
			$(".popups input, .popups textarea").each((index, element) => {
				element.value = "";
			});
			let content = {
				language: window.lang,
				inputVal: {},
			};
			this.state.inputValues
				.filter((input) => input.name.indexOf("contact") === 0)
				.forEach((inputVal) => {
					content.inputVal[inputVal.name] = inputVal.value;
				});

			window.store.dispatch({ type: "TOGGLE_POPUP", name: "contact" });
			window.store.dispatch({ type: "TOGGLE_POPUP", name: "responseMessage" });
			Axios.post(process.env.REACT_APP_BACKEND_ENDPOINT + "/contactRequest/contact", content).then(function (response) {
				setTimeout(function () {
					window.store.dispatch({ type: "REQUEST_FINISHED", name: "responseMessage", response: response.data.message });
				}, 1000);
			});
		}*/
	};

	render() {
		return <></>;
		/*return (
			<Popup name="contact" title={t("footer.contact")} type="small-popup">
				<form onSubmit={this.sendContactRequest} className="basicInput">
					<BasicInput
						type="text"
						name="contactName"
						minLength="4"
						required={true}
						setValue={this.setInputValue}
						placeholder={t("input.basic.name")}
					/>
					<BasicInput type="email" name="contactEmail" required={true} setValue={this.setInputValue} placeholder={t("input.basic.email")} />
					<BasicInput type="tel" name="contactPhone" setValue={this.setInputValue} placeholder={t("input.basic.phone")} />
					<BasicInput
						type="text"
						name="contactSubject"
						required={true}
						setValue={this.setInputValue}
						placeholder={t("input.basic.subject")}
					/>
					<BasicInput
						type="textarea"
						name="contactMessage"
						required={true}
						setValue={this.setInputValue}
						placeholder={t("input.basic.message")}
					/>
					<button className="btn" disabled={this.state.disabled}>
						{t("input.basic.message_submit")}
					</button>
				</form>
			</Popup>
		);*/
	}
}

export default withTranslation()(Contact);
