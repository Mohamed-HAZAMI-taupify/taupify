import { GET_ALL_EVENTS, GET_EVENTS, GET_EVENTS_SEARCH } from "../../data/actionTypes";
const initialState = {
  eventList: [],
  allEventList: [],
};
const EventReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        eventList: [...state.eventList, ...action.payload],
        listType: "events",
        hasMore: action.payload.length > 0,
      };
    case GET_EVENTS_SEARCH:
      return {
        ...state,
        ...action.payload,
         eventList: action.payload,
        hasMore: action.payload.length > 0, 
      };
      case GET_ALL_EVENTS:
        return {
          ...state,
          ...action.payload,
          allEventList: action.payload,
        };
    default:
      return state;
  }
};
export default EventReducer;
