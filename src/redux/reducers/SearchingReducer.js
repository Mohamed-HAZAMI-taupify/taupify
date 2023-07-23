import {
  SEARCHING,
  SEARCH_DATE,
  SEARCH_TYPE,
  SEARCH_MONTH,
  SEARCH_DATE_STATE,
  HANDLE_SCROLL,
  SEARCHING_ACTIVITY,
  SWITCH_BUTTON,
  SEARCHING_PROSPECT_TYPE,
  SEARCHING_SOURCE_CONTACT,
  SEARCHING_STATE_CONTACT,
} from "../../data/actionTypes";
const initialState = {
  searching: "",
  searchDate: new Date(),
  searchType: "all",
  searchMonth: "",
  searchDateState: false,
  page: 0,
  searchActivity: "",
  switched: false,
  searchprospectType: "",
  searchState: null,
  searchSource: null,
};
const SearchingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCHING:
      return {
        ...state,
        searching: action.payload,
      };
    case SEARCHING_ACTIVITY:
      return {
        ...state,
        searchActivity: action.payload,
      };
    case SEARCH_DATE:
      return {
        ...state,
        searchDate: action.payload,
      };
    case SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
      };
    case SEARCH_MONTH:
      return {
        ...state,
        searchMonth: action.payload,
      };
    case SEARCH_DATE_STATE:
      return {
        ...state,
        searchDateState: action.payload,
      };
    case HANDLE_SCROLL:
      return {
        ...state,
        page: action.payload,
      };
    case SWITCH_BUTTON:
      return {
        ...state,
        switched: action.payload,
      };
    case SEARCHING_PROSPECT_TYPE:
      return {
        ...state,
        searchprospectType: action.payload,
      };
    case SEARCHING_STATE_CONTACT:
      return {
        ...state,
        searchState: action.payload,
      };
    case SEARCHING_SOURCE_CONTACT:
      return {
        ...state,
        searchSource: action.payload,
      };
    default:
      return state;
  }
};
export default SearchingReducer;
