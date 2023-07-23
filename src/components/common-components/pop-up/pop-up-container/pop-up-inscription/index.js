import React from "react";
import { connect } from "react-redux";
import ConetntInscriptionModal from "../../contents/content-inscription-modal";
import PopUp from "../../index";

function InscriptionPopUp(props) {
 
  const {inscriptionhomePageModal} = props.adminReducer.modal;
  return (
    <PopUp
    modalToggle={'inscriptionhomePageModal'}
    modalIsOpen={inscriptionhomePageModal}
    modal_image={'https://i.ibb.co/c3h11ps/img.jpg'}
    modal_content = {<ConetntInscriptionModal/>}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    adminReducer: state.AdminReducer,
  };
};

export default connect(
  mapStateToProps,
  null
)(InscriptionPopUp);
