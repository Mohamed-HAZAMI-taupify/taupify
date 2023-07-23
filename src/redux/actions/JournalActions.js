import {
  ARTICLE_CONTENT,
  EDITOR_VALUE,
  ARTICLE_HEADER,
  ID_ARTICLE_TO_EDIT,
} from "../../data/actionTypes";

export const addArticleContent = (content) => {
  return (dispatch) => {
    dispatch({
      type: ARTICLE_CONTENT,
      payload: content,
    });
  };
};
export const addArticleHeader = (header) => {
  return (dispatch) => {
    dispatch({
      type: ARTICLE_HEADER,
      payload: header,
    });
  };
};

export const editorCurrent = (text) => {
  return (dispatch) => {
    dispatch({
      type: EDITOR_VALUE,
      payload: text,
    });
  };
};

export const setArticleId = (id) => {
  return (dispatch) => {
    dispatch({
      type: ID_ARTICLE_TO_EDIT,
      payload: id,
    });
  };  
};
