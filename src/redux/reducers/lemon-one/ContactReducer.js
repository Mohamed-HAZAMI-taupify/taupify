import {
  GET_LEMON_ONE_CONTACT,
  GET_LEMON_ONE_CONTACT_SEARCH,
} from "../../../data/actionTypes";
const initialState = {
  lemonOneContactList: [],
};
const LemonOneContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LEMON_ONE_CONTACT:
      return {
        ...state,
        lemonOneContactList: action.payload,
      };
    case GET_LEMON_ONE_CONTACT_SEARCH:
      return {
        ...state,
        lemonOneContactList: [...state.lemonOneContactList, ...action.payload],
        hasMore: action.payload.length > 0,
        loading: false,
      };
    default:
      return state;
  }
};
export default LemonOneContactReducer;
