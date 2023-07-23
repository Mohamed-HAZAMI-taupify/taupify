import {
    GET_CONTACT_GAME,
   
  } from "../../../data/actionTypes";
  const initialState = {
    ContactGameList: [],
  };
  const ContactGameReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CONTACT_GAME:
        return {
          ...state,
          ContactGameList: action.payload,
        };
      default:
        return state;
    }
  };
  export default ContactGameReducer;