import React from "react";
import { connect } from "react-redux";
import { toggle } from "../../../../../../../redux/actions/AdminActions";
import ModalInput from "../../../../../../common-components/modals/inputs";
import EditEverfitContact from "./content";

const UpdateEverfitContact = (props) => {

  const {everfitContactEdit} = props.adminReducer.modal;

  return (
    <ModalInput
    modalToggle={"everfitContactEdit"}
    modalIsOpen={everfitContactEdit}
    content ={<EditEverfitContact/>}
    modalTitle={"Modifier le Contact Everfit"}
    />
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
)(UpdateEverfitContact);
