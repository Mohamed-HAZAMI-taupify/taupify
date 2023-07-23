import axios from "axios";
import {
    GET_QESTIONS_LIST
} from "../../../data/actionTypes";
import { _base_url_feedback_question } from "../../../data/config";

export const getQuestions = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(_base_url_feedback_question);
      dispatch({
        type: GET_QESTIONS_LIST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
