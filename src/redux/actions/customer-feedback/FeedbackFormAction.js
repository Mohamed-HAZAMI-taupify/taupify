
import axios from "axios";
import {
    CREATE_FEEDBACK_FORM,
    GET_FEED_BACK_FORM_LIST
} from "../../../data/actionTypes";
import { _base_url_feedback_form } from "../../../data/config";

export const createFeedbackForm = (feedbackForm) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(_base_url_feedback_form, feedbackForm);
        await dispatch({
          type: CREATE_FEEDBACK_FORM,
          payload: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    };
  };

  export const getFeedbackForm = () => {
    return async (dispatch) => {
      try {
        const res = await axios.get(_base_url_feedback_form);
        dispatch({
          type: GET_FEED_BACK_FORM_LIST,
          payload: res.data.reverse(),
        });
      } catch (err) {
        console.log(err);

      }
    };
  };
