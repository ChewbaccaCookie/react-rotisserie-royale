import axios from "axios";
import { Dialog } from "onedash-dialog";
import { Form, Input, Textarea } from "onedash-react-input-form";
import React from "react";
import { useTranslation } from "react-i18next";
import PopupContext from "../Utils/PopupContext";

const Contact = ({ isOpen }) => {
	const { t } = useTranslation();
	const { togglePopup, updateResponseMessage } = React.useContext(PopupContext);

	const sendContactRequest = (data, form) => {
		form.resetForm();
		const reqData = {
			inputVal: data,
			language: window.lang,
		};
		togglePopup("response");
		axios.post(`${process.env.REACT_APP_BACKEND_ENDPOINT}/contactRequest/contact`, reqData).then((response) => {
			setTimeout(() => {
				updateResponseMessage(response.data.message);
			}, 1000);
		});
		togglePopup("contact");
	};

	return (
		<Dialog isOpen={isOpen} buttons={[]} onClose={() => togglePopup("contact")} name="contact" title={t("footer.contact")}>
			<Form validateOnSubmit submitText={t("input.basic.message_submit")} onSubmit={sendContactRequest}>
				<div className="fieldset">
					<Input required autoComplete="name" name="contactName" placeholder={t("input.basic.name")} />
					<Input type="email" required name="contactEmail" autoComplete="email" placeholder={t("input.basic.email")} />
					<Input type="tel" autoComplete="tel" name="contactPhone" placeholder={t("input.basic.phone")} />
					<Input type="text" required name="contactSubject" autoComplete="off" placeholder={t("input.basic.subject")} />
					<Textarea
						rows={4}
						className="full-width"
						type="textarea"
						name="contactMessage"
						required
						placeholder={t("input.basic.additional_info")}
					/>
				</div>
			</Form>
		</Dialog>
	);
};

export default Contact;
