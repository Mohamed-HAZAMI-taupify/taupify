import React from "react";
import { connect } from "react-redux";
import modalInput from "../../../../../common-components/modals/inputs";
import AddEverfitContactModalContent from "./content";

const AddEverfitContactModal = (props) => {
  const { everfitContact } = props.adminReducer.modal;

  return (
    <modalInput
      modalToggle={"everfitContact"}
      modalIsOpen={everfitContact}
      content={<AddEverfitContactModalContent />}
      modalTitle={"Ajouter un contact d'Everfit"}
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
)(AddEverfitContactModal);
