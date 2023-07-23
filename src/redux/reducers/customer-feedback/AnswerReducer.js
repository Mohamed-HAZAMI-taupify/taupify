import { ANSWERS_LIST } from "../../../data/actionTypes";

const initialState = {
  answersList: [],
};

const AnswerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ANSWERS_LIST:
      return {
        ...state,
        answersList:  action.payload,
      };

    default:
      return state;
  }
};
export default AnswerReducer;
