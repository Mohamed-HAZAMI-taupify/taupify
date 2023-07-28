import { GET_STUDIO_REST } from "../../data/actionTypes";

const initialState = {
  StudioList: [],
  loading: true,
};
const StudioRestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDIO_REST:
      return {
        ...state,
        loading: false,
        StudioList: action.payload,
      };
    default:
      return state;
  }
};
export default StudioRestReducer;
