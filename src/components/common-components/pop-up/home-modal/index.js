import React from "react";
import { connect } from "react-redux";
import PopUp from "../index";
import ConetntInscriptionModal from "../contents/content-inscription-modal"
function HomeModal(props) {
  
  const {homePageModal} = props.adminReducer.modal;

  return (
    <PopUp
      modalToggle={"homePageModal"}
      modalIsOpen={homePageModal}
      modal_image={
        "https://i.ibb.co/kqCT224/img2.jpg"
      }
      modal_content={<ConetntInscriptionModal />}

    />
  );
}

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};

export default connect(mapStateToProps, null)(HomeModal);