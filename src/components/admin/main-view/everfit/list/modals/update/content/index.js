import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { editEverfitContact } from "../../../../../../../../redux/actions/everfit/ContactActions";

const EditEverfitContact = (props) => {
  const { everfitContactDetails } = props.contactReducer;
  const { alerts } = props.alertReducer;

  const [formData, setFormData] = useState({
    _id: everfitContactDetails._id,
    firstname: everfitContactDetails.firstname,
    lastname: everfitContactDetails.lastname,
    email: everfitContactDetails.email,
    phone: everfitContactDetails.phone,
    BPJEPSAF: everfitContactDetails.BPJEPSAF,
    message: everfitContactDetails.message,
    codepostal: everfitContactDetails.codepostal,
  });

  const {
    _id,
    firstname,
    lastname,
    email,
    phone,
    BPJEPSAF,
    message,
    codepostal,
  } = formData;

  const onChange = (e) => {
    let el = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: el });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.editEverfitContact(formData);
  };
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="input-modal-inputs-container">
          <div className="input-modal-element">
            <h3>Prénom</h3>
            <TextField
              className="input-modal-input-box"
              name="firstname"
              value={firstname}
              onChange={(e) => onChange(e)}
            />
            <label className="alert">
              {alerts.firstname && alerts.firstname}
            </label>
          </div>
          <div className="input-modal-element">
            <h3>Nom</h3>
            <TextField
              className="input-modal-input-box"
              value={lastname}
              name="lastname"
              onChange={(e) => onChange(e)}
            />
            <label className="alert">
              {alerts.lastname && alerts.lastname}
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
              value={phone}
              name="phone"
              onChange={(e) => onChange(e)}
            />
            <label className="alert">{alerts.phone && alerts.phone}</label>
          </div>
          <div className="input-modal-element">
            <h3>Code Postal</h3>
            <TextField
              className="input-modal-input-box"
              type="number"
              value={codepostal}
              name="codepostal"
              onChange={(e) => onChange(e)}
            />
            <label className="alert">
              {alerts.codepostal && alerts.codepostal}
            </label>
          </div>
        </div>
        <div className="input-modal-inputs-container">
          <div className="input-modal-element">
            <h3>BPJEPS AF</h3>
            <Select
              className="input-modal-input-box input-modal-select-box"
              value={BPJEPSAF}
              name="BPJEPSAF"
              onChange={(e) => onChange(e)}
            >
              <MenuItem value="BPJEPS AF OPTION HALTÉROPHILIE MUSCULATION">
                BPJEPS AF OPTION HALTÉROPHILIE MUSCULATION
              </MenuItem>
              <MenuItem value="BPJEPS AF OPTION COURS COLLECTIF">
                BPJEPS AF OPTION COURS COLLECTIF
              </MenuItem>
            </Select>
          </div>
        </div>
        <div className="input-modal-inputs-container">
          <div className="input-modal-element input-modal-element-full">
            <h3>Message</h3>
            <TextField
              multiline
              rows={6}
              className="input-modal-input-box"
              value={message}
              name="message"
              onChange={(e) => onChange(e)}
            />
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
  editEverfitContact: (data) => {
    dispatch(editEverfitContact(data));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    contactReducer: state.EverfitContactReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditEverfitContact);
