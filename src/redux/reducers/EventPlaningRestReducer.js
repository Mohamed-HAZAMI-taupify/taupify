import { GET_EVENTPLANINIG_REST } from "../../data/actionTypes";

const initialState = {
  EventList: [],
  loading: true,
};
const EventPlaningRestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTPLANINIG_REST:
      return {
        ...state,
        loading: false,
        EventList: action.payload,
      };
    default:
      return state;
  }
};
export default EventPlaningRestReducer;
