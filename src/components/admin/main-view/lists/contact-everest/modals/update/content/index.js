import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { toggle } from "../../../../../../../../redux/actions/AdminActions";
import { updateContactUser } from "../../../../../../../../redux/actions/ContactEverestActions";
import { MenuItem, Select } from "@material-ui/core";
import {
  sourceList,
  stateList,
} from "../../../../../../../../data/utils/searchListsData";

const EditContactEverest = (props) => {
  const { contactEverestDetails } = props.contactEverestReducer;
  const { alerts } = props.alertReducer;

  const [formData, setFormData] = useState({
    _id: contactEverestDetails.id,
    givenName: contactEverestDetails.givenName,
    familyName: contactEverestDetails.familyName,
    email: contactEverestDetails.email,
    mobile: contactEverestDetails.mobile,
    sourceId: contactEverestDetails.sourceId,
    state: contactEverestDetails.state,
    subscribe: contactEverestDetails.subscribe,
  });

  const { _id, givenName, familyName, email, mobile, state, sourceId } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeSource = (newValue) => {
    setFormData({
      ...formData,
      sourceId: newValue,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.updateContactUser(_id, formData);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="input-modal-inputs-container">
          <div className="input-modal-element">
            <h3>Prénom</h3>
            <TextField
              className="input-modal-input-box"
              multiline
              id="standard-basic"
              value={givenName}
              name="givenName"
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
              id="standard-basic"
              name="familyName"
              value={familyName}
              onChange={(e) => onChange(e)}
            />
            <label className="alert">
              {alerts.familyName && alerts.familyName}
            </label>{" "}
          </div>
        </div>

        <div className="input-modal-inputs-container">
          <div className="input-modal-element">
            <h3>Adresse email</h3>
            <TextField
              className="input-modal-input-box"
              id="standard-basic"
              value={email}
              name="email"
              onChange={(e) => onChange(e)}
              fullWidth
              disabled
            />
            <label className="alert">{alerts.email && alerts.email}</label>
          </div>
          <div className="input-modal-element">
            <h3>Téléphone</h3>
            <TextField
              className="input-modal-input-box"
              value={mobile}
              name="mobile"
              onChange={(e) => onChange(e)}
            />
            <label className="alert">{alerts.mobile && alerts.mobile}</label>
          </div>
        </div>
        <div className="input-modal-inputs-container">
          <div className="input-modal-element source-element">
            <h3>Source</h3>
            <Select
              className="input-modal-input-box input-modal-select-box"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={sourceId}
              name="sourceId"
              onChange={(e) => onChange(e)}
              label="Age"
            >
              {sourceList.map((source, index) => (
                <MenuItem key={index} value={source}>
                  {source}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="input-modal-element source-element">
            <h3>Status</h3>
            <Select
              className="input-modal-input-box input-modal-select-box"
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={state}
              name="state"
              onChange={(e) => onChange(e)}
              label="Status"
            >
              {stateList.map((state, index) => (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="button-container-add">
          <button className=" btn-ev btn-s uppercase" type="submit">
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  updateContactUser: (contactEverestID, data) => {
    dispatch(updateContactUser(contactEverestID, data));
  },
});
const mapStateToProps = (state) => {
  return {
    contactEverestReducer: state.ContactEverestReducer,
    alertReducer: state.AlertReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContactEverest);
