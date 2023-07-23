import React from "react";
import { connect } from "react-redux";
import ModalInput from "../../../../../../common-components/modals/inputs";
import EditActivity from "./content";

const UpdateActivityModal = (props) => {

  const {updateActivityModal} = props.adminReducer.modal;

  return (
    <ModalInput
    modalToggle={"updateActivityModal"}
    modalIsOpen={updateActivityModal}
    content ={<EditActivity/>}
    modalTitle={"Modifier cette Activité"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};

export default connect(
  mapStateToProps,
  null
)(UpdateActivityModal);
