import { GET_All_ADMIN } from "../../data/actionTypes";
const initialState = {
  allAdmin: []
};
const AllAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_All_ADMIN:
      return {
        ...state,
        allAdmin: action.payload,
      };
    default:
      return state;
  }
};
export default AllAdminReducer;
