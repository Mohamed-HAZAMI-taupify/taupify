import React from "react";
import { connect } from "react-redux";
import PopUp from "../../index";
import ConetntHomeModal from "../../contents/content-home-modal";
function HomeModal(props) {
  
  const {homePageModal} = props.adminReducer.modal;

  return (
    <PopUp
      modalToggle={"homePageModal"}
      modalIsOpen={homePageModal}
      modal_image={
        "https://i.ibb.co/JCThYdB/photo-15.jpg"
      }
      modal_content={<ConetntHomeModal />}

    />
  );
}

const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};

export default connect(mapStateToProps, null)(HomeModal);
