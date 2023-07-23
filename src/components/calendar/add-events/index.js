import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { toggle } from "../../../redux/actions/AdminActions";
import { addCalendarEvent } from "../../../redux/actions/EventCalendarActions";
import { TextField } from "@material-ui/core";
import Select from "react-select";
import {
  titleEventsList,
  durationList,
} from "../../../data/calendarEventsList";
import { colourStyles } from "../../../data/select-react-styles";

const AddCalendarEvents = (props) => {
  const { calendarEvents } = props.adminReducer.modal;
  const { alerts } = props.alertReducer;

  const [formData, setFormData] = useState({
    duration: "",
    title: "",
    backgroundColor: "white",
    height: "",
  });

  const { duration, title, backgroundColor, height } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeTitle = (event) => {
    event !== null
      ? setFormData({ ...formData, title: event })
      : setFormData({ ...formData, title: { label: "", value: "" } });
  };

  const handleChangeDuration = (newValue) => {
    setFormData({
      ...formData,
      duration: newValue,
      backgroundColor: newValue.color,
      height: newValue.height,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await props.addCalendarEvent(formData);
    setFormData({
      duration: "",
      title: "",
      backgroundColor: "white",
      height: "",
    });
  };
  return (
    <Modal
      isOpen={calendarEvents}
      toggle={() => props.toggle("calendarEvents", false)}
      className="add-prospect-modal"
    >
      <div className="add-prospect-modal-content">
        <ModalHeader toggle={() => props.toggle("calendarEvents", false)}>
          <span style={{ color: backgroundColor }}> Nouveau événement</span>
        </ModalHeader>
        <ModalBody className="add-prospect-body">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="inputs-add-container">
              <div className="input-add max">
                <Select
                  placeholder="title"
                  onChange={handleChangeTitle}
                  options={titleEventsList.map((e) => ({
                    label: e.label,
                    value: e.value,
                  }))}
                  styles={colourStyles}
                />
                <label className="alert">{alerts.title && alerts.title}</label>
              </div>
              <div className="input-add max">
                <Select
                  isClearable
                  placeholder="duration"
                  onChange={handleChangeDuration}
                  options={durationList.map((e) => ({
                    label: e.label,
                    value: e.value,
                    color: e.color,
                    height: e.height,
                  }))}
                  styles={colourStyles}
                />
                <label className="alert">
                  {alerts.duration && alerts.duration}
                </label>
              </div>
              <div className="input-add unset-display">
                <TextField
                  isClearable
                  placeholder="backgroundColor"
                  className="input-filled-add-box"
                  name="backgroundColor"
                  value={backgroundColor}
                  onChange={(e) => onChange(e)}
                  disabled
                />
                <label className="alert">
                  {alerts.backgroundColor && alerts.backgroundColor}
                </label>
              </div>
              <div className="input-add unset-display">
                <TextField
                  disabled
                  placeholder="height"
                  className="input-filled-add-box"
                  value={height}
                  name="height"
                  onChange={(e) => onChange(e)}
                />
                <label className="alert">
                  {alerts.height && alerts.height}
                </label>
              </div>
              <button className="btn-add btn-ev" type="submit">
                Ajouter
              </button>
            </div>
          </form>
        </ModalBody>
      </div>
    </Modal>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  addCalendarEvent: (event) => {
    dispatch(addCalendarEvent(event));
  },
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
    alertReducer: state.AlertReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCalendarEvents);
