import {
    GET_K2_CONTACT,
   
  } from "../../../data/actionTypes";
  const initialState = {
    k2ContactList: [],
  };
  const K2ContactReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_K2_CONTACT:
        return {
          ...state,
          k2ContactList: action.payload,
        };
      default:
        return state;
    }
  };
  export default K2ContactReducer;