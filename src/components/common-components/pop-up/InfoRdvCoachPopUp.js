import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { toggle } from "../../../redux/actions/AdminActions";

const InfoRdvCoachPopUp = (props) => {
  const { buttonLabel, className } = props;
  let InfoRdvCoachPopUp = props.adminReducer.modal.InfoRdvCoachPopUp;

  return (
    <Modal
      className="rdv-info-modal-body"
      isOpen={InfoRdvCoachPopUp}
      toggle={() => props.toggle("InfoRdvCoachPopUp", false)}
      className={className}
    >
      <ModalBody>
        Vous pouvez prendre rendez-vous à partir du vendredi le 16 juillet 2021.{" "}
      </ModalBody>
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
