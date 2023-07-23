import { CREATE_FEEDBACK_FORM,
  GET_FEED_BACK_FORM_LIST } from "../../../data/actionTypes";

const initialState = {
  feedBackFormId: "",
  feedBackFormList:[]
};

const FeedbackFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEEDBACK_FORM:
      return {
        ...state,
        feedBackFormId: JSON.stringify(action.payload._id),
      };

      case GET_FEED_BACK_FORM_LIST:
        return {
          ...state,
          feedBackFormList: action.payload,
        };
      

    default:
      return state;
  }
};
export default FeedbackFormReducer;