import {
  GET_POPUP_LIST,
  POPUP_DETAILS,
  GET_HOME_POPUP,
} from "../../data/actionTypes";

const initialState = {
  popupList: [],
  popupById: {},
  popupDetails: {},
  homePopupDetails: {},
};

const PopUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POPUP_LIST:
      return {
        ...state,
        popupList: action.payload,
        loadingList: false,
      };
    case GET_HOME_POPUP:
      return {
        ...state,
        homePopupDetails: action.payload,
        loading: false,
      };

    case POPUP_DETAILS:
      return {
        ...state,
        popupDetails: action.payload,
      };
    default:
      return state;
  }
};
export default PopUpReducer;
