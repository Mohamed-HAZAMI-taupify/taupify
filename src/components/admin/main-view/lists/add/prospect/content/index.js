import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { addContactEverest } from "../../../../../../../redux/actions/ContactEverestActions";

const AddProspectModalContent = (props) => {
  const { alerts } = props.alertReducer;

  const [formData, setFormData] = useState({
    givenName: "",
    familyName: "",
    email: "",
    mobile: "",
    sourceId: "admin",
    subscribe: true,
    state: "prospect",
  });

  const { givenName, familyName, email, mobile } = formData;

  const onChange = (e) => {
    let el = e.target.type == "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: el });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.addContactEverest(formData, "admin_prospect");
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>Prénom</h3>
          <TextField
            className="input-modal-input-box"
           
            name="givenName"
            value={givenName}
            onChange={(e) => onChange(e)}
          />
          <label className="alert">
            {alerts.givenName && alerts.givenName}
          </label>
        </div>
        <div className="input-modal-element">
          <h3>Nom</h3>
          <TextField
            className="input-modal-input-box"
           
            name="familyName"
            value={familyName}
            onChange={(e) => onChange(e)}
          />
          <label className="alert">
            {alerts.familyName && alerts.familyName}
          </label>
        </div>
      </div>
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
        <div className="input-modal-element">
          <h3>Téléphone</h3>
          <TextField
            className="input-modal-input-box"
            type="number"
            value={mobile}
            name="mobile"
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>

      <div className="button-container-add">
        <button className="btn-ev btn-s uppercase" type="submit">
          Ajouter
        </button>
      </div>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addContactEverest: (prospect, state) => {
    dispatch(addContactEverest(prospect, state));
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
)(AddProspectModalContent);
