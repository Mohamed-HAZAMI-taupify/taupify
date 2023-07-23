import {
    GET_POPUP,
    GET_POPUP_SEARCH,
    COUNT_POPUP_NBRE,
  } from "../../data/actionTypes";
  const initialState = {
    popUpList: [],
    popUpNumber: [],
    loading: true,
  };
  const PopUpNbreReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_POPUP:
        return {
          ...state,
          popUpList: [...state.popUpList, ...action.payload],
          hasMore: action.payload.length > 0,
          loading: false,
        };
      case GET_POPUP_SEARCH:
        return {
          ...state,
          popUpList: action.payload,
          hasMore: action.payload.length > 0,
          loading: false,
        };
     
      case COUNT_POPUP_NBRE:
        return {
          ...state,
          popUpNumber: action.payload,
        };
      default:
        return state;
    }
  };
  export default PopUpNbreReducer;
  