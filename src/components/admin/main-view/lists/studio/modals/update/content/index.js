import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Select from "react-select";
import { colourStyles } from "../../../../../../../../data/select-react-styles";
import { editStudio } from "../../../../../../../../redux/actions/StudiosActions";
import { getClubs } from "../../../../../../../../redux/actions/ClubActions";

const EditStudio = (props) => {
  useEffect((props) => {
    props.getClubs({});
  }, []);

  const { clubList } = props.clubReducer;
  const { studioDetails } = props.studioReducer;
  const { alerts } = props.alertReducer;

  const [value, setValue] = useState({
    label: studioDetails.club.name,
    value: studioDetails.club.id,
  });
  const [formData, setFormData] = useState({
    name: studioDetails.name,
    club: studioDetails.club,
    streetAddress: studioDetails.streetAddress,
    postalCode: studioDetails.postalCode,
    addressLocality: studioDetails.addressLocality,
    addressCountry: studioDetails.addressCountry,
  });

  const { name, streetAddress, postalCode, addressLocality, addressCountry } =
    formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeClub = (event) => {
    if (event !== null) {
      setValue({ label: event.label, value: event.value });
      setFormData({ ...formData, club: event.value });
    } else {
      setValue({ label: "", value: "" });
      setFormData({ ...formData, club: "" });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.editStudio(studioDetails["@id"].replace(/^\D+/g, ""), formData);
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
            placeholder="Clubs"
            isMulti
            onChange={(e) => onChangeClub(e)}
            options={clubList.map((e) => ({
              label: e.name,
              value: e["@id"],
            }))}
            value={value.value}
            isClearable
            styles={colourStyles}
            components={{
              IndicatorSeparator: () => null,
            }}
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
        <button className="btn-ev btn-s" type="submit">
          Modifier
        </button>
      </div>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  getClubs: () => {
    dispatch(getClubs());
  },

  editStudio: (url, studio) => {
    dispatch(editStudio(url, studio));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    clubReducer: state.ClubReducer,
    studioReducer: state.StudioReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStudio);
