import axios from "axios";
import {
  GET_ARTCILE_JOURNAL_LIST,
  GET_ARTCILE_JOURNAL_BY_ID,
  ARTCILE_JOURNAL_DETAILS,
  ADD_ARTCILE_JOURNAL,
  UPDATE_ARTCILE_JOURNAL,
  DELETE_ARTCILE_JOURNAL,
  ID_ARTICLE_TO_EDIT,
} from "../../data/actionTypes";
import { handleSnackbar, handleWaitSnackbar } from "./AlertActions";
import { _base_url_article_journal } from "../../data/config";
import Swal from "sweetalert2/src/sweetalert2";
import { createBrowserHistory } from "history";
import { useQuery } from "@apollo/client";
import { LOAD_ARTICLES_BY_IS_TREND } from "../../components/graphQL/Queries";
import { data } from "../../data/routes/routesData";

export const browserHistory = createBrowserHistory();

export const getAllarticleJournals = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(_base_url_article_journal);
      dispatch({
        type: GET_ARTCILE_JOURNAL_LIST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getArticleJournalById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(_base_url_article_journal + "/" + id);
      await dispatch({
        type: GET_ARTCILE_JOURNAL_BY_ID,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteArticleJournal = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(_base_url_article_journal + "/" + id);
      Swal.fire({
        title: "Féliciations!",
        text: " Votre article est supprimé avec succès",
        icon: "success",
      });
      dispatch({
        type: DELETE_ARTCILE_JOURNAL,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Erreur!",
        text: "Un erreur de serveur s'est produit, Veuillez contacter l'équipe IT",
        icon: "error",
      });
    }
  };
};

export const createArticleJournal = (ArticleJournal) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(_base_url_article_journal, ArticleJournal);

      await dispatch({
        type: ADD_ARTCILE_JOURNAL,
        payload: res.data,
      });
      await dispatch({
        type: ID_ARTICLE_TO_EDIT,
        payload: res.data._id,
      });
      browserHistory.push(data.journal + `/article/${res.data._id}/edit`);
      window.location.reload();
      Swal.fire({
        title: "Féliciations!",
        text: " Votre article est ajouté avec succès",
        icon: "success",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Erreur!",
        text: "Un erreur de serveur s'est produit, Veuillez contacter l'équipe IT",
        icon: "error",
      });
    }
  };
};

export const editArticleJournal = (id, articleJournal) => {
  return async (dispatch) => {
    try {
      dispatch(handleWaitSnackbar("enregistrement en cours", "info", true));
      const res = await axios.put(
        _base_url_article_journal + "/" + id,
        articleJournal
      );
      await dispatch({
        type: UPDATE_ARTCILE_JOURNAL,
        payload: res.data,
      });

      if (res.status == 200) {
        dispatch(
          handleSnackbar("modifications enregistrés avec succès", "success")
        );
      }
      dispatch(getAllarticleJournals());
    } catch (err) {
      console.log(err);
      dispatch(
        handleSnackbar(
          "Un erreur de serveur s'est produit, veuillez vérifier la connxion internet ou contacter l'équipe IT",
          "error"
        )
      );
    }
  };
};

export const articleJournalDetails = (articleJournal) => {
  return (dispatch) => {
    dispatch({
      type: ARTCILE_JOURNAL_DETAILS,
      payload: articleJournal,
    });
  };
};
