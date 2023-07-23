import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { colourStyles } from "../../../../../../../../data/select-react-styles";
import { editActivity } from "../../../../../../../../redux/actions/ActivityActions";
import { durationsData } from "../../../../../../../../data/add-container-data/durationsData";
import { asMinutes } from "pomeranian-durations";
import Select from "react-select";

const EditActivity = (props) => {
  const { activityById } = props.activityReducer;
  const { alerts } = props.alertReducer;

  const [valuesList, setValuesList] = useState(
    activityById.durations &&
      activityById.durations.map((t) => ({
        label: asMinutes(t) + " Min",
        value: t,
      }))
  );
  const [formData, setFormData] = useState({
    name: activityById.name,
    durations: activityById.durations && activityById.durations,
    colorHex: activityById.colorHex,
  });

  const { name } = formData;

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
    props.editActivity(activityById["@id"].split("/").pop(), formData);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="input-modal-inputs-container">
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
              styles={colourStyles}
              value={valuesList}
            />
            <label className="alert">
              {alerts.durations && alerts.durations}
            </label>
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
  editActivity: (url, activity) => {
    dispatch(editActivity(url, activity));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    activityReducer: state.ActivityReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditActivity);
