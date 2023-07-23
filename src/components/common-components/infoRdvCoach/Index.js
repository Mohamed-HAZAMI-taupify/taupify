import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { connect } from "react-redux";
import { toggle } from "../../../redux/actions/AdminActions";

const InfoRdvCoachPopUp = (props) => {
  const { InfoRdvCoachPopUp } = props.adminReducer.modal;

  return (
    <Modal
      isOpen={InfoRdvCoachPopUp}
      toggle={() => props.toggle("InfoRdvCoachPopUp", false)}
      centered
      size="lg"
      className="input-modal"
    >
      <div className="input-modal-content">
        <ModalHeader
          className="prospect-header"
          toggle={() => props.toggle("InfoRdvCoachPopUp", false)}
        ></ModalHeader>
        <ModalBody className="input-modal-body add-activity-body minimised rdv-info-modal-body ">
          Vous pouvez prendre rendez-vous à partir du vendredi le 16 juillet
          2021.{" "}
        </ModalBody>
      </div>
    </Modal>
  );
};
const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InfoRdvCoachPopUp);
