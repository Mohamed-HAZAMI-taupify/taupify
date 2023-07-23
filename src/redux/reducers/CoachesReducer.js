import { GET_COACHES } from "../../data/actionTypes";
const initialState = {
    Coaches: []
};
const CoachesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COACHES:
      return {
        ...state,
        Coaches: action.payload,
      };
    default:
      return state;
  }
};
export default CoachesReducer;