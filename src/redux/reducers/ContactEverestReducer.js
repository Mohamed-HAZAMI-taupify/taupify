import {
  CONTACT_EVEREST_DETAILS,
} from "../../data/actionTypes";
const initialState = {
  contactEverestDetails: {},
  loading: true,
};
const ContactEverestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_EVEREST_DETAILS:
      return { ...state, contactEverestDetails: action.payload };
    default:
      return state;
  }
};
export default ContactEverestReducer;
