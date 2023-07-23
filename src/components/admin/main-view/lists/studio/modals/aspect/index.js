import React from "react";
import { connect } from "react-redux";
import ModalDetails from "../../../../../../common-components/modals/aspect";
import DetailsContentStudio from "./content";

function StudioDetailsModal(props) {
  const { studioDetailsModal } = props.adminReducer.modal;

  return (
    <ModalDetails
      modalToggle={"studioDetailsModal"}
      modalIsOpen={studioDetailsModal}
      content={<DetailsContentStudio />}
      modalTitle={"Détails du studio"}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};

export default connect(
  mapStateToProps,
  null
)(StudioDetailsModal);
