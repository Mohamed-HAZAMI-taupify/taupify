import React, { useState } from "react";
import { connect } from "react-redux";
import { toggle } from "../../../../../../../../redux/actions/AdminActions";
import {
  ContactUsDetails,
  ReplyContactUs,
} from "../../../../../../../../redux/actions/MessageProspectAction";
import { TextField } from "@material-ui/core";

const ReplyNewMessageModalContent = (props) => {
  const { contactUsDetails } = props.contactUsProspectReducer;

  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    message: "",
    _id: "",
  });
  const [show, setShow] = useState(false);

  const { message } = formData;

  const onChangeMessage = (e) => {
    setFormData({
      ...formData,
      lastname: contactUsDetails.lastname,
      firstname: contactUsDetails.firstname,
      email: contactUsDetails.email,
      message: e.target.value,
      _id: contactUsDetails._id,
    });
    setShow(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await props.ReplyContactUs(formData);
    setShow(false);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>À</h3>
          <TextField
            className="input-modal-input-box"
            placeholder="A"
           
            disabled
            value={contactUsDetails.email}
          ></TextField>
        </div>
      </div>
      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>Objet</h3>
          <TextField
            className="input-modal-input-box"
            placeholder="Objet"
            value={"Réponse contactez-nous"}
            disabled
          ></TextField>
        </div>
      </div>
      <div className="input-modal-inputs-container">
        <div className="input-modal-element input-modal-element-full">
          <h3>Message</h3>

          <TextField
            className="input-modal-input-box"
            multiline
            rows={10}
            placeholder=""
            value={message}
            name="message"
            onChange={(e) => onChangeMessage(e)}
          />
        </div>
      </div>

      <div className="button-container-add">
        <button
          className=" btn-ev btn-s uppercase"
          type="submit"
          disabled={show === true ? false : true}
        >
          Envoyer
        </button>
      </div>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  ContactUsDetails: (contact) => {
    dispatch(ContactUsDetails(contact));
  },
  ReplyContactUs: (contact) => {
    dispatch(ReplyContactUs(contact));
  },
});
const mapStateToProps = (state) => {
  return {
    contactUsProspectReducer: state.ContactUsProspectReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReplyNewMessageModalContent);
