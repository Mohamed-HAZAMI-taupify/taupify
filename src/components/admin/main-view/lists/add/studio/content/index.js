import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { getClubs } from "../../../../../../../redux/actions/ClubActions";
import Select from "react-select";
import { colourStyles } from "../../../../../../../data/select-react-styles";
import { addStudio } from "../../../../../../../redux/actions/StudiosActions";

const AddStudioModalContent = (props) => {
  const { alerts } = props.alertReducer;
  const { clubList } = props.clubReducer;
  const [formData, setFormData] = useState({
    name: "",
    club: "",
    streetAddress: "",
    postalCode: "",
    addressLocality: "",
    addressCountry: "",
  });
  const {
    name,
    streetAddress,
    postalCode,
    addressLocality,
    addressCountry,
  } = formData;

  useEffect(() => {
    props.getClubs({});
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeClub = (event) => {
    event !== null
      ? setFormData({ ...formData, state: event.value })
      : setFormData({ ...formData, state: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await props.addStudio(formData);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="input-modal-inputs-container">
        <h2 className="title-studio-add">Général</h2>
      </div>
      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>Nom du studio</h3>
          <TextField
            className="input-add-box"
           
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <label className="alert">{alerts.name && alerts.name}</label>
        </div>
        <div className="input-modal-element">
          <h3>Club</h3>
          <Select
            isClearable
            onChange={(e) => onChangeClub(e)}
            options={
              clubList.length
                ? clubList.map((e) => ({
                    label: e.name,
                    value: e["@id"],
                  }))
                : ""
            }
            placeholder="clubs"
            styles={colourStyles}
            components={{
              IndicatorSeparator: () => null,
            }}
            name="club"
          />
          <label className="alert">{alerts.club && alerts.club}</label>
        </div>
      </div>

      <div className="input-modal-inputs-container">
        <h2 className="title-studio-add">COORDONNÉES</h2>
      </div>

      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>Adresse</h3>
          <TextField
            className="input-add-box"
           
            name="streetAddress"
            value={streetAddress}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="input-modal-element">
          <h3>Code postal</h3>
          <TextField
            className="input-add-box"
           
            name="postalCode"
            value={postalCode}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="input-modal-inputs-container">
        <div className="input-modal-element">
          <h3>Ville</h3>
          <TextField
            className="input-add-box"
           
            name="addressLocality"
            value={addressLocality}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="input-modal-element">
          <h3>Pays</h3>
          <TextField
            className="input-add-box"
           
            name="addressCountry"
            value={addressCountry}
            onChange={(e) => onChange(e)}
          />
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
  addStudio: (studio) => {
    dispatch(addStudio(studio));
  },
  getClubs: () => {
    dispatch(getClubs());
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    clubReducer: state.ClubReducer,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStudioModalContent);;
