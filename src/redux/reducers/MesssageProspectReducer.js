import {
  CONTACT_US_DETAILS,
  GET_CONTACT_US_PROSPECTS,
  GET_CONTACT_US_PROSPECTS_SEARCH,
} from "../../data/actionTypes";
const initialState = {
  contactUsProspectsList: [],
  loading: true,
  contactUsDetails: {},
};
const ContactUsProspectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACT_US_PROSPECTS:
      return {
        ...state,
        contactUsProspectsList: [
          ...state.contactUsProspectsList,
          ...action.payload,
        ],
        listType: "contactUsProspects",
        hasMore: action.payload.length > 0,
        loading: false,
      };
    case GET_CONTACT_US_PROSPECTS_SEARCH:
      return {
        ...state,
        contactUsProspectsList: action.payload,
        listType: "contactUsProspects",
        hasMore: action.payload.length > 0,
        loading: false,
      };
      case CONTACT_US_DETAILS:
        return {
          ...state,
          contactUsDetails: action.payload,
        };
  
    default:
      return state;
  }
};
export default ContactUsProspectReducer;
