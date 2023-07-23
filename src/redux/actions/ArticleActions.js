import axios from "axios";
import { GET_ARTICLE } from "../../data/actionTypes";
import { _base_url_acticle } from "../../data/config";

var showArticle = true;
const showArticles = () => {
  showArticle = !showArticle;
};

export const getArticles = () => {
  return async (dispatch) => {
    try {
      if (showArticle) {
        const res = await axios.get(_base_url_acticle);
        dispatch({
          type: GET_ARTICLE,
          payload: res.data,
        });
        showArticles();
      }
    } catch (err) {
      console.error(err);
    }
  };
};
