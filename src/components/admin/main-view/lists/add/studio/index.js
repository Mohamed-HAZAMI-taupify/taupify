import React from "react";
import { connect } from "react-redux";
import AddStudioModalContent from "./content";
import ModalInput from "../../../../../common-components/modals/inputs";

const AddStudioModal = (props) => {
  const { studio } = props.adminReducer.modal;

  return (
    <ModalInput
      modalToggle={"studio"}
      modalIsOpen={studio}
      content={<AddStudioModalContent />}
      modalTitle={"Ajouter un Studio"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};
export default  connect(mapStateToProps, null)(AddStudioModal);;
