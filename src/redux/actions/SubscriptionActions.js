import axios from "axios";
import { GET_SUBSCRIPTIONS } from "../../data/actionTypes";
import { _base_url_subscriptions } from "../../data/config";
import { spinnerSubscription, SubscriptioNotFound } from "./AlertActions";
import jwt_decode from "jwt-decode";

export const getSubscriptions = () => {
  return async (dispatch) => {
    try {
      await dispatch(spinnerSubscription(true));
      const res = await axios.get(_base_url_subscriptions , {
        params: {
          param: jwt_decode(localStorage.getItem('token')).targetId
        }
      });
      dispatch({
        type: GET_SUBSCRIPTIONS,
        payload: res.data,
      });
      await dispatch(spinnerSubscription(false));
    } catch (err) {
      console.error(err);
      dispatch(spinnerSubscription(false));
      dispatch(SubscriptioNotFound(true));
    }
  };
};
