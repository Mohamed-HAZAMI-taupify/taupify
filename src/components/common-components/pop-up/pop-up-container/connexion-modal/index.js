import React from "react";
import { connect } from "react-redux";
import ConetntConnexionModal from "../../contents/content-connexion-modal";
import PopUp from "../../index";
function ConnexionModal(props) {
  const { connexionModal } = props.adminReducer.modal;
  return (
    <PopUp
      modalToggle={"connexionModal"}
      modalIsOpen={connexionModal}
      modal_image={"https://i.ibb.co/y5htZFt/img-2.jpg"}
      modal_content={<ConetntConnexionModal />}
      modal_classname="pop-up-everest"
    />
  );
}

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};


export default connect(mapStateToProps, null)(ConnexionModal);
