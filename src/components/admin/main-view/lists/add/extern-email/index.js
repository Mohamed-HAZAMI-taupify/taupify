import React from "react";
import { connect } from "react-redux";
import ModalInput from "../../../../../common-components/modals/inputs";
import AddExternEmailsModalContent from "./content";

const AddExternEmailsModal = (props) => {
  const { externEmail } = props.adminReducer.modal;

  return (
    <ModalInput
      modalToggle={"externEmail"}
      modalIsOpen={externEmail}
      content={<AddExternEmailsModalContent />}
      modalTitle={"Ajouter un Email Externe"}
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
)(AddExternEmailsModal);;
