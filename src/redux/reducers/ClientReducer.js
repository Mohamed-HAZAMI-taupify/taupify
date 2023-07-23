import {
  GET_MEMBERS,
  MEMBER_DETAILS,
  GET_MEMBERS_SEARCH,
  GET_ALL_MEMBERS,
  GET_CONTACT_PROFIL,
} from "../../data/actionTypes";
const initialState = {
  membersList: [],
  memberDetails: {},
  allMembers: [],
  contactData: {},
  loading: true,
};
const MembersReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_CONTACT_PROFIL:
      return {
        ...state,
        contactData: action.payload,
        loading: false,
      };
    case GET_MEMBERS:
      return {
        ...state,
        membersList: [...state.membersList, ...action.payload],
        loading: false,
      };
    case GET_ALL_MEMBERS:
      return {
        ...state,
        allMembers: action.payload,
        loading: false,
      };
    case GET_MEMBERS_SEARCH:
      return {
        ...state,
        membersList: action.payload,
        hasMore: action.payload.length > 0,
        loading: false,
      };

    case MEMBER_DETAILS:
      return {
        ...state,
        memberDetails: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
export default MembersReducer;
