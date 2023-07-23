import axios from "axios";
import { PAYMENT } from "../../data/actionTypes";
import { _create_payment_intent } from "../../data/config";

export const payment = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(_create_payment_intent);
      window.open(res.data.url, "_blank");
      dispatch({
        type: PAYMENT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
