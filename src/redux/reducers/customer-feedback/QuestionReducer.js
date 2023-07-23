import { GET_QESTIONS_LIST } from "../../../data/actionTypes";

const initialState = {
  questionsList: [],
};

const QuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QESTIONS_LIST:
      return {
        ...state,
        questionsList: action.payload,
      };

    default:
      return state;
  }
};
export default QuestionReducer;
