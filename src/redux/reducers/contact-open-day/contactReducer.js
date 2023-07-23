import {
    GET_CONTACT_OPEN_DAY,
  } from "../../../data/actionTypes";
  const initialState = {
    ContactOpenDay: [],
  };
  const ContactOpenDayReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CONTACT_OPEN_DAY:
        return {
          ...state,
          ContactOpenDay: action.payload,
        };
      default:
        return state;
    }
  };
  export default ContactOpenDayReducer;