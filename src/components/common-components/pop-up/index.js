import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { toggle } from "../../../redux/actions/AdminActions";
import { connect } from "react-redux";
import SkeletonLoader from "../image-loader/SkeletonLoader";

function PopUp(props) {
  return (
    <Modal
      isOpen={props.modalIsOpen}
      modalTransition={{ timeout: 800 }}
      transitionentertimeout={{ timeout: 10000 }}
      backdropTransition={{ timeout: 1000 }}
      toggle={async () => {
        props.toggle(props.modalToggle, false);
      }}
      className={"pop-up-ev " + props.modal_classname}
      centered={true}
    >
      <ModalBody className={"modal-body " + props.modal_body_classname}>
        <i
          className="fas fa-times modal-x-icon"
          onClick={async () => {
            props.toggle(props.modalToggle, false);
          }}
        ></i>
        <section className="modal-left">
          {props.modal_image ? (
            <SkeletonLoader
              alt="Everest Studio page"
              className="modal-image"
              src={props.modal_image}
            />
          ) : null}
        </section>
        {props.modal_content ? props.modal_content : null}
      </ModalBody>
      {props.modal_snackbar ? props.modal_snackbar : null}
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});

export default connect(null, mapDispatchToProps)(PopUp);
