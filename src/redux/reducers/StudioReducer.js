import {
  GET_STUDIO,
  GET_STUDIO_CLUB,
  GET_STUDIO_CLUBS,
  STUDIOS_DETAILS,
} from "../../data/actionTypes";
const initialState = {
  studioList: [],
  studioDetails: {},
  club: [],
  studioClubList: [],
  loading: true,
};
const StudioReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDIO:
      return {
        ...state,
        studioList: action.payload,
        loading: false,
      };

    case GET_STUDIO_CLUB:
      return {
        ...state,
        club: action.payload,
      };

    case STUDIOS_DETAILS:
      return { ...state, studioDetails: action.payload };

    case GET_STUDIO_CLUBS:
      return {
        ...state,
        studioClubList: action.payload,
      };

    default:
      return state;
  }
};
export default StudioReducer;
