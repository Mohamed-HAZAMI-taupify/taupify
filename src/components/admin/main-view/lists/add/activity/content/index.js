import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";
import { connect } from "react-redux";
import { addActivity } from "../../../../../../../redux/actions/ActivityActions";
import { durationsData } from "../../../../../../../data/add-container-data/durationsData";
import { colourStyles } from "../../../../../../../data/select-react-styles";

const AddActivityModalContent = (props) => {
  const { alerts } = props.alertReducer;

  const [formData, setFormData] = useState({
    name: "",
    durations: [],
    colorHex: "#FEC619",
  });
  const [valuesList, setValuesList] = useState(null);

  const { name, durations } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeDuration = (newValue) => {
    if (newValue !== null) {
      setValuesList(newValue);
      setFormData({ ...formData, durations: newValue.map((e) => e.value) });
    } else {
      setValuesList(null);
      setFormData({ ...formData, durations: [] });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    props.addActivity(formData);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="input-modal-inputs-container ">
        <div className="input-modal-element">
          <h3>Nom de l'activité</h3>
          <TextField
            className="input-modal-input-box"
           
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <label className="alert">{alerts.name && alerts.name}</label>
        </div>
      </div>
      <div className="input-modal-inputs-container ">
        <div className="input-modal-element">
          <h3>Durée</h3>
          <Select
            isMulti
            placeholder="durée"
            onChange={(e) => onChangeDuration(e)}
            options={durationsData}
            value={valuesList}
            styles={colourStyles}
          />
          <label className="alert">
            {alerts.durations && alerts.durations}
          </label>
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
  addActivity: (activity) => {
    dispatch(addActivity(activity));
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
)(AddActivityModalContent);
