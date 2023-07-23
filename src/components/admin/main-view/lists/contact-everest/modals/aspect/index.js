import React from "react";
import { connect } from "react-redux";
import ModalDetails from "../../../../../../common-components/modals/aspect";
import ContentContactEverestAspectModal from "./content";

const ContactEverestAspectModal = (props) => {
  const { contactEverestDetailsModal } = props.adminReducer.modal;

  return (
    <ModalDetails
      modalToggle={"contactEverestDetailsModal"}
      modalIsOpen={contactEverestDetailsModal}
      content={<ContentContactEverestAspectModal />}
      modalName={"Détails du Contact Everest"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};

export default connect(mapStateToProps, null)(ContactEverestAspectModal);
