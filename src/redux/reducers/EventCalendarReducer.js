import { GET_CALENDAR_EVENTS_LIST } from "../../data/actionTypes";

const initialState = {
    calendarEventList: [],

};
const EventCalendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CALENDAR_EVENTS_LIST:
            return {
                ...state,
                calendarEventList: action.payload,
            };

        default:
            return state;
    }
};
export default EventCalendarReducer;
