import {
  GET_ACTIVITIES,
  GET_ACTIVITY,
  ACTIVITY_DETAILS,
} from "../../data/actionTypes";

const initialState = {
  activityList: [],
  activityDetails: {},
  activityById: {},
  loading: true,
};
const ActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        activityList: action.payload,
        loading: false,
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activityById: action.payload,
      };
    case ACTIVITY_DETAILS:
      return {
        ...state,
        activityDetails: action.payload,
      };

    default:
      return state;
  }
};
export default ActivityReducer;
