import { GET_CLUBS_REST } from "../../data/actionTypes";

const initialState = {
  clubsList: [],
  loading: true,
};
const ClubsRestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLUBS_REST:
      return {
        ...state,
        loading: false,
        clubsList: action.payload,
      };
    default:
      return state;
  }
};
export default ClubsRestReducer;
