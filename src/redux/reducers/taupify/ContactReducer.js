import {
  DETAILS_TAUPIFY_CONTACT,
  GET_TAUPIFY_CONTACT_SEARCH,
} from "../../../data/actionTypes";
const initialState = {
  taupifyContactList: [],
  taupifyContactDetails: {},
};
const TaupifyContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAUPIFY_CONTACT_SEARCH:
      return {
        ...state,
        taupifyContactList: action.payload,
      };

    case DETAILS_TAUPIFY_CONTACT:
      return {
        ...state,
        taupifyContactDetails: action.payload,
      };

    default:
      return state;
  }
};
export default TaupifyContactReducer;
