import {
  AUTH_MEMBER,
  AUTH_ERROR,
  USER_LOADED,
  AUTH_MEMBER_ERROR,
  LOGOUT,
  LOGIN_FAIL_EVEREST,
  LOGIN_SUCCESS_EVEREST,
  USER_LOADED_EVEREST,
  LOGOUT_EVEREST,
  AUTH_ERROR_EVEREST,
} from "../../data/actionTypes";

const initialState = {
  token: localStorage.getItem("token"),
  tokenEverest: localStorage.getItem("tokenEverest"),
  isAuthenticated: false,
  isAuthenticatedEverest: false,
  user: {},
  userEverest: {},
  loading: false,
  loadingEverest: false,
};

const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    ///// RESAMANIA //////
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        contactId: payload.contactId.split("/").pop(),
        contactUserId: payload["@id"].split("/").pop(),
        loading: true,
      };

    ///// RESAMANIA //////
    case AUTH_MEMBER:
      localStorage.setItem("token", payload);
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: true,
      };

    ///// RESAMANIA //////
    case AUTH_ERROR:
    case AUTH_MEMBER_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: true,
      };

    ///// EVEREST //////
    case USER_LOADED_EVEREST:
      return {
        ...state,
        isAuthenticatedEverest: true,
        userEverest: payload,
        loadingEverest: true,
      };

    ///// EVEREST //////
    case LOGIN_SUCCESS_EVEREST:
      localStorage.setItem("tokenEverest", payload.token);
      return {
        ...state,
        ...payload,
        // isAuthenticatedEverest: true,
        loadingEverest: false,
      };

    ///// EVEREST //////
    case LOGIN_FAIL_EVEREST:
      localStorage.removeItem("tokenEverest");
      return {
        ...state,
        tokenEverest: null,
        isAuthenticatedEverest: false,
        userEverest: null,
        loadingEverest: true,
      };

    ///// EVEREST //////
    case AUTH_ERROR_EVEREST:
    case LOGOUT_EVEREST:
      localStorage.removeItem("tokenEverest");
      return {
        ...state,
        tokenEverest: null,
        isAuthenticatedEverest: false,
        userEverest: null,
        loadingEverest: true,
      };

    default:
      return state;
  }
};
export default AuthReducer;
