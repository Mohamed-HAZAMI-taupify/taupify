import {
    GET_CONTACT_FORMULAIRE,
   
  } from "../../../data/actionTypes";
  const initialState = {
    ContactFormList: [],
  };
  const ContactFormReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CONTACT_FORMULAIRE:
        return {
          ...state,
          ContactFormList: action.payload,
        };
      default:
        return state;
    }
  };
  export default ContactFormReducer;