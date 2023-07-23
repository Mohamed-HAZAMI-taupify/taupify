import {
  GET_COACH_LIST,
  COACH_DETAILS_LIST,
  GET_COACH_NO_FILTER,
  GET_COACH_WITH_FILTER,
  GET_COACH_BY_ID,
  GET_COACH_LIST_SEARCH,
  GET_ALL_COACHES,
  GET_COACH_IMAGE,
} from "../../data/actionTypes";
const initialState = {
  coachList: [],
  coachListDetails: {},
  coachsListNoFilter: [],
  coachsListWithFilter: [],
  coach: {},
  allCoachList: [],
  coachImageResamania: [],
  loading: true,
};
const CoachListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COACH_LIST:
      return {
        ...state,
        coachList: [...state.coachList, ...action.payload],
        hasMore: action.payload.length > 0,
        loading: false,
      };
    case GET_ALL_COACHES:
      return {
        ...state,
        allCoachList: action.payload,
        loading: false,
      };
    case GET_COACH_LIST_SEARCH:
      return {
        ...state,
        listType: "coaches",
        coachList: action.payload,
        hasMore: action.payload.length > 0,
        loading: false,
      };

    case COACH_DETAILS_LIST:
      return { ...state, coachListDetails: action.payload };

    case GET_COACH_BY_ID:
      return { ...state, coach: action.payload };

    case GET_COACH_WITH_FILTER:
      return { ...state, coachsListWithFilter: action.payload, loading: false };

    case GET_COACH_NO_FILTER:
      return {
        ...state,
        coachsListNoFilter: action.payload,
      };

    case GET_COACH_IMAGE:
      return {
        ...state,
        coachImageResamania: action.payload,
      };

    default:
      return state;
  }
};
export default CoachListReducer;
