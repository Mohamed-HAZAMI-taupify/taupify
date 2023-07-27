import { GET_ACTIVITY_REST } from "../../data/actionTypes";

const initialState = {
  activityList: [],
  loading: true,
};
const ActivityRestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITY_REST:
      return {
        ...state,
        loading: false,
        activityList: action.payload,
      };
    default:
      return state;
  }
};
export default ActivityRestReducer;
