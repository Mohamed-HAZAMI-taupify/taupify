import {
  EVERFIT_CONTACT_DETAILS,
  GET_EVERFIT_CONTACT,
  GET_EVERFIT_TRAINING,
} from "../../../data/actionTypes";
const initialState = {
  everfitContactList: [],
  everfitContactDetails: {},
  trainingList: [],
};
const EverfitContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVERFIT_CONTACT:
      return {
        ...state,
        everfitContactList: action.payload,
      };

    case EVERFIT_CONTACT_DETAILS:
      return {
        ...state,
        everfitContactDetails: action.payload,
      };
    case GET_EVERFIT_TRAINING:
      return {
        ...state,
        trainingList: action.payload,
      };
    default:
      return state;
  }
};
export default EverfitContactReducer;
