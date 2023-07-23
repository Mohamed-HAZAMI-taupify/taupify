import React from "react";
import { connect } from "react-redux";
import DetailsContentActivity from "./content";
import ModalDetails from "../../../../../../common-components/modals/aspect";

const ActivityModal = (props) => {
  const { activityDetailsModal } = props.adminReducer.modal;

  return (
    <ModalDetails
      modalToggle={"activityDetailsModal"}
      modalIsOpen={activityDetailsModal}
      content={<DetailsContentActivity />}
      modalTitle={"Détail de l'Activité"}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};

export default connect(mapStateToProps, null)(ActivityModal);
