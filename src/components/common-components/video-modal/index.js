import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { toggle } from "../../../redux/actions/AdminActions";

const VideoModal = (props) => {
  const { videoModal } = props.adminReducer.modal;

  return (
    <Modal
      isOpen={videoModal}
      toggle={() => props.toggle("videoModal", false)}
      className="input-modal"
      size="lg"
      centered
    >
      <div className="input-modal-content">
        <ModalHeader
          className="prospect-header"
          toggle={() => props.toggle("videoModal", false)}
        >
          Everest Sport Club
        </ModalHeader>
        <ModalBody className="input-modal-body add-activity-body minimised">
          <iframe
            style={{ width: "100%" }}
            frameBorder="0"
            allowFullScreen
            src="https://www.youtube.com/embed/0hbZWo7MIgY?showinfo=0"
          ></iframe>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoModal);
