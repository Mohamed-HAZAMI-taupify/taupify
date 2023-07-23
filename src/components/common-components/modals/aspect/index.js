import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { toggle } from "../../../../redux/actions/AdminActions";

function ModalDetails(props) {
  const { coachListDetails } = props.coachListReducer;
  var coachImage = coachListDetails.image && coachListDetails.image._url;

  return (
    <Modal
      isOpen={props.modalIsOpen}
      toggle={() => {
        props.toggle(props.modalToggle, false);
      }}
      centered
      className="details-modal-ev modal-ev"
    >
      <ModalHeader
        toggle={() => props.toggle(props.modalToggle, false)}
        className="details-modal-header"
      >
        {props.withImage ? null : <>{props.modalTitle}</>}
      </ModalHeader>
      <ModalBody className="details-modal-body">
        {props.withImage ? (
          <div className="block-image-container">
            <div className="image-container-circular-bordered">
              <div className="profile-picture-details-member">
                <img src={coachImage} className="img img-responsive" />
              </div>
            </div>
          </div>
        ) : null}
        <div className="container-details-prospect">
          {props.content ? props.content : null}
        </div>
      </ModalBody>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    coachListReducer: state.CoachListReducer,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDetails);
