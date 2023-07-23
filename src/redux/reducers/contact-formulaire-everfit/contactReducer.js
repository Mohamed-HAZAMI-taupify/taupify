import {
    GET_CONTACT_FORMULAIRE_EVERFIT,
  } from "../../../data/actionTypes";
  const initialState = {
    ContactEverfitFormList: [],
  };
  const ContactEverfitFormReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CONTACT_FORMULAIRE_EVERFIT:
        return {
          ...state,
          ContactEverfitFormList: action.payload,
        };
      default:
        return state;
    }
  };
  export default ContactEverfitFormReducer;