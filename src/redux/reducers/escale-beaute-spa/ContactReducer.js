import {
  GET_ESCALE_SPA_CONTACT,
  GET_ESCALE_SPA_SEARCH,
} from "../../../data/actionTypes";

const initialState = {
  escaleSpaContactList: [],
  loading: true,
};

const EscaleSpaContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ESCALE_SPA_CONTACT:
      return {
        ...state,
        escaleSpaContactList: [
          ...state.escaleSpaContactList,
          ...action.payload,
        ],
        hasMore: action.payload.length > 0,
        loading: false,
      };
    case GET_ESCALE_SPA_SEARCH:
      return {
        ...state,
        escaleSpaContactList: action.payload,
        hasMore: action.payload.length > 0,
        loading: false,
      };
    default:
      return state;
  }
};
export default EscaleSpaContactReducer;
