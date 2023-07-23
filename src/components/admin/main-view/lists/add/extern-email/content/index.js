import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { addContactEverest } from "../../../../../../../redux/actions/ContactEverestActions";

const AddExternEmailsModalContent = (props) => {
  const { alerts } = props.alertReducer;
  const [formData, setFormData] = useState({
    email: "",
    sourceId: "admin",
    subscribe: true,
    state: "exten_emails",
    givenName: "--",
    familyName: "--",
    mobile: "--",
  });
  const { email } = formData;

  const onChange = (e) => {
    let el = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: el });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.addContactEverest(formData, "exten_emails"); 
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>Adresse email</h3>
          <TextField
            className="input-modal-input-box"
           
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <label className="alert">{alerts.email && alerts.email}</label>
        </div>
      </div>

      <div className="button-container-add">
        <button className=" btn-ev btn-s uppercase" type="submit">
          Ajouter
        </button>
      </div>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addContactEverest: (contact, state) => {
    dispatch(addContactEverest(contact, state));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExternEmailsModalContent);
