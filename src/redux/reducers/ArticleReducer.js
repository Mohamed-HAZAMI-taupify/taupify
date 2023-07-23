import { GET_ARTICLE} from "../../data/actionTypes";
  const initialState = {
  articleList: [],
  };
  const ArticleReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ARTICLE:
        return {
          ...state,
          articleList: action.payload,
        };
  
      default:
        return state;
    }
  };
  export default ArticleReducer;