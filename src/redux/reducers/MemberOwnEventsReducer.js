import {
  GET_CLASS_EVENT_BY_ID,
  GET_MEMBER_OWN_EVENTS,
  GET_MEMBER_OWN_EVENTS_GQL_SUCCESS,
} from "../../data/actionTypes";
const initialState = {
  memberOwnEventsList: [],
  classEventListById: {},
  totalItems: 0,
  memberOwnEventsGQLList: [],
  itemslength:0,
};
const MemberOwnEventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBER_OWN_EVENTS:
      return {
        ...state,
        memberOwnEventsList: action.payload,
        totalItems: action.totalItems,
      };


      case GET_MEMBER_OWN_EVENTS_GQL_SUCCESS:
        return {
          ...state,
          memberOwnEventsGQLList: action.payload,
          itemslength: action.itemslength
        };
  

    case GET_CLASS_EVENT_BY_ID:
      return {
        ...state,
        classEventListById: action.payload,
      };
    default:
      return state;
  }
};
export default MemberOwnEventsReducer;
