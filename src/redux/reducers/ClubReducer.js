import { GET_CLUB, GET_CLUB_BY_ID} from "../../data/actionTypes";
  const initialState = {
  clubList: [],
  clubName: {},
  };
  const ClubReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CLUB:
        return {
          ...state,
          clubList: action.payload,
        };

        case GET_CLUB_BY_ID:
          return { ...state, clubName: action.payload };
  
      default:
        return state;
    }
  };
  export default ClubReducer;