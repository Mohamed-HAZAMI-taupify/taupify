import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { toggle } from "../../../../redux/actions/AdminActions";

function ModalInput(props) {
  return (
    <Modal
      isOpen={props.modalIsOpen}
      toggle={() => {
        props.toggle(props.modalToggle, false);
      }}
      centered
      className="input-modal-ev modal-ev"
    >
      <ModalHeader
        toggle={() => props.toggle(props.modalToggle, false)}
        className={props.withImage ? "header-with-img" : "input-modal-header"}
      >
        {props.withImage ? null : <>{props.modalTitle}</>}
      </ModalHeader>
      <ModalBody className="input-modal-body">
        {props.content ? props.content : null}
      </ModalBody>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});

export default connect(null, mapDispatchToProps)(ModalInput);
