import React from "react";
import { connect } from "react-redux";
import ModalInput from "../../../../../common-components/modals/inputs";
import AddActivityModalContent from "./content";

const AddActivityModal = (props) => {
  const { activity } = props.adminReducer.modal;

  return (
    <ModalInput
      modalToggle={"activity"}
      modalIsOpen={activity}
      content={<AddActivityModalContent />}
      modalTitle={"Ajouter une Activité"}
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
)(AddActivityModal);
