import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Dialog, Form, Input } from "@onedash/tools";
import PopupUtils from "../Utils/PopupUtils";
import Axios from "axios";

class Contact extends Component {
	state = {
		inputValues: [],
		disabled: true,
	};

	sendContactRequest = (data, form) => {
		form.resetForm();
		const reqData = {
			inputVal: data,
			language: window.lang,
		};
		PopupUtils.showPopup("responseMessage");
		Axios.post(process.env.REACT_APP_BACKEND_ENDPOINT + "/contactRequest/contact", reqData).then(function (response) {
			setTimeout(function () {
				PopupUtils.setResponseMessage(response.data.message);
			}, 1000);
		});
		PopupUtils.closePopup("contact");
	};

	render() {
		const t = this.props.t;
		return (
			<Dialog
				isOpen={this.props.isOpen}
				buttons={[]}
				onClose={() => PopupUtils.closePopup("contact")}
				name="contact"
				title={t("footer.contact")}
			>
				<Form validateOnSubmit submitText={t("input.basic.message_submit")} onSubmit={this.sendContactRequest}>
					<div className="fieldset">
						<Input required autoComplete="name" name="contactName" placeholder={t("input.basic.name")} />
						<Input type="email" required name="contactEmail" autoComplete="email" placeholder={t("input.basic.email")} />
						<Input type="tel" autoComplete="tel" name="contactPhone" placeholder={t("input.basic.phone")} />
						<Input type="text" required name="contactSubject" autoComplete="off" placeholder={t("input.basic.subject")} />
						<Input type="textarea" name="contactMessage" required placeholder={t("input.basic.additional_info")} />
					</div>
				</Form>
			</Dialog>
		);
	}
}

export default withTranslation()(Contact);
