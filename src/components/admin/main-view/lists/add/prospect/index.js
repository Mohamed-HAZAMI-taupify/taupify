import React from "react";
import { connect } from "react-redux";
import ModalInput from "../../../../../common-components/modals/inputs";
import AddProspectModalContent from "./content";

const AddProspectModal = (props) => {
  const { prospect } = props.adminReducer.modal;

  return (
    <ModalInput
      modalToggle={"prospect"}
      modalIsOpen={prospect}
      content={<AddProspectModalContent />}
      modalTitle={"Ajouter un Prospect"}
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
)(AddProspectModal);
