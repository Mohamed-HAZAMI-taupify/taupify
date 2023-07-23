
import axios from "axios";
import { ANSWERS_LIST } from "../../../data/actionTypes";
import { _base_url_feedback_answer } from "../../../data/config";

export const addAnswers = (answerList, feedbackFormId) => {
  return async (dispatch) => {
    try {
      if (feedbackFormId) {
        await Promise.all(
          answerList.map(async (e) => {
           axios.post(_base_url_feedback_answer, {
              question: e.question,
              feedbackForm: feedbackFormId,
              rate: e.rate,
            });
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};


export const setAnswerList = (answersList) => {
  return (dispatch) => {
    dispatch({
      type: ANSWERS_LIST,
      payload: answersList,
    });
  };
};