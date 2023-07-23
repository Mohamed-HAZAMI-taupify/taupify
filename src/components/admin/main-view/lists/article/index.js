import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import TableBackOffice from "../../../../common-components/table-back-office";
import { connect } from "react-redux";
import { editArticleJournal } from "../../../../../redux/actions/ArticleJournalActions";
import Select from "react-select";
import Swal from "sweetalert2/src/sweetalert2";
import { setArticleId } from "../../../../../redux/actions/JournalActions";
import { useHistory } from "react-router-dom";

import { articleState } from "../../../../../data/articleData";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  LOAD_ARTICLES_BY_SEARCH_TITLE,
  LOAD_ARTICLES_TREND,
} from "../../../../../graphQL/Queries";
import {
  DELETE_ARTCILE,
  UPDATE_ARTCILE,
} from "../../../../../graphQL/Mutations";
import { handleSnackbar } from "../../../../../redux/actions/AlertActions";
import { data } from "../../../../../data/routes/routesData";
import { theadArticle } from "../../../../../data/admin/lists/tableHead";

const Articles = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  const [articleSearched, setArticleSearched] = useState();
  //trendList : comportes les articles qui s'affichent dans la carousel des articles à la une dans /journal
  const [trendList, setTrendList] = useState([]);
  const [formData, setFormData] = useState({
    state: "",
    isTrend: false,
  });
  const { state, isTrend } = formData;

  const [getArticles, { loading, error, data: dataSearch }] = useLazyQuery(
    LOAD_ARTICLES_BY_SEARCH_TITLE,
    {
      variables: { title: searchInput },
    }
  );
  const { data: dataTrend } = useQuery(LOAD_ARTICLES_TREND);
  const [updateArticle, { error: errorUpdate }] = useMutation(UPDATE_ARTCILE);
  const [deleteArticle, { error: errorDelete }] = useMutation(DELETE_ARTCILE);

  useEffect(() => {
    getArticles();
    if (dataTrend) {
      setTrendList(dataTrend.getAllArticles);
    }
  }, [dataTrend]);

  useEffect(() => {
    if (dataSearch) {
      setArticleSearched(dataSearch.articlesSearch);
    }
  }, [dataSearch]);

  var isTrendList =
    trendList && trendList.filter((article) => article.isTrend === true);

  const onEditClick = async (articleId) => {
    await props.setArticleId(articleId);
    history.push(`${data.journal}${data.article}/${articleId}/edit`);
  };

  const onDisplayClick = async (articleId) => {
    await props.setArticleId(articleId);
    history.push(
      `${data.journal}${data.article}/${articleId}/display`
    );
  };

  const updateState = async (el, id) => {
    const result = await Swal.fire({
      title: "Etes-vous sûr?",
      text: `Etes-vous sûr de vouloir modifier l'état de l'aritcle ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Modifier!",
      cancelButtonText: "Annuler",
    });
    if (result.isConfirmed) {
      props.editArticleJournal(id, { state: el.value });
    } else if (result.isDismissed) {
      Swal.fire({
        text: "La modification n'est pas enregistrée",
        icon: "warning",
      });
    }
  };

  const onChangeEtat = async (event, articleId) => {
    setFormData({ ...formData, state: event.value });

    await updateArticle({
      variables: {
        id: articleId,
        articleInput: { state: event.value },
      },
    });
    if (!errorUpdate) {
      await getArticles();
      props.handleSnackbar("modifications enregistrés avec succès", "success");
    } else {
      props.handleSnackbar(
        "Un erreur de serveur s'est produit, veuillez vérifier la connxion internet ou contacter l'équipe IT",
        "error"
      );
    }
  };

  const onChangeIsTrend = async (event, articleId) => {
    if (isTrendList.length !== 0) {
      await updateArticle({
        variables: {
          id: articleId,
          articleInput: { isTrend: event.target.checked },
        },
      });
      if (!errorUpdate) {
        await getArticles();
        props.handleSnackbar(
          "modifications enregistrés avec succès",
          "success"
        );
      } else {
        props.handleSnackbar(
          "Un erreur de serveur s'est produit, veuillez vérifier la connxion internet ou contacter l'équipe IT",
          "error"
        );
      }
    }
  };

  const onDeleteClick = async (idArticle) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text: "êtes-vous sûr de vouloir supprimer l'article ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",
      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteArticle({
          variables: { id: idArticle },
        });
        if (!errorDelete) {
          await getArticles();
          props.handleSnackbar("suppression effectuée avec succès", "success");
        } else {
          props.handleSnackbar(
            "Un erreur de serveur s'est produit, veuillez vérifier la connxion internet ou contacter l'équipe IT",
            "error"
          );
        }
      }
    });
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      width: 150,
      backgroundColor: "white",
      borderRadius: state.isFocused ? "10px" : 10,
      borderColor: state.isFocused ? "grey" : "white",
      boxShadow: state.isFocused ? "grey" : "black",
      cursor: "pointer",
      "&:hover": {
        border: "1px solid white",
        boxShadow: "0px 0px 6px white",
      },
      "&:focus": {
        border: "1px solid white",
        boxShadow: "0px 0px 6px white",
      },
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "red" : "white",
        visibility: "visible",
        color: "black",
        cursor: isDisabled ? "not-allowed" : "default",
        cursor: isFocused ? null : null,
      };
    },
    menu: (styles) => ({
      ...styles,
      marginTop: 0,
    }),
  };

  return (
    <>
      <div className="searchDiv search-article">
        <TextField
          id="outlined-search"
          label={"Recherche par titre ..."}
          type="search"
          variant="outlined"
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
          className="searchResult-textfield"
        />
      </div>
      {articleSearched && (
        <TableBackOffice
          loading={loading}
          listData={articleSearched}
          theadData={theadArticle}
          tbody={articleSearched.map((article, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{article.title}</td>
              <td>{article.type}</td>
              <td>{article.createdAt}</td>
              <td>{article.createdBy}</td>
              <td className="istrend-column-article">
                <input
                  key={index}
                  disabled={
                    isTrendList.length === 1 &&
                    articleSearched[index].isTrend === true
                  }
                  value={article.isTrend}
                  type="checkbox"
                  checked={article.isTrend && article.isTrend}
                  defaultChecked={article.isTrend && article.isTrend}
                  onChange={(event) => {
                    onChangeIsTrend(event, article.id);
                  }}
                />
              </td>

              <td className="state-column-article">
                <div className="select-container-article">
                  <Select
                    options={articleState.map((e) => ({
                      label: e.label,
                      value: e.value,
                    }))}
                    name="state"
                    onChange={async (el) => {
                      onChangeEtat(el, article.id);
                    }}
                    defaultValue={{
                      label: article.state,
                      value: article.state,
                    }}
                    value={{
                      label: article.state,
                      value: article.state,
                    }}
                    menuPortalTarget={document.querySelector("body")}
                    menuPosition="fixed"
                    styles={colourStyles}
                    maxMenuHeight={80}
                    placeholder="Etat de l'article"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </td>
              <td className="actions-cell">
                <i
                  onClick={() => onDeleteClick(article.id)}
                  className="fas fa-trash-alt"
                />
                <i
                  onClick={() => onEditClick(article.id)}
                  className="fas fa-user-edit"
                />
                <i
                  onClick={() => onDisplayClick(article.id)}
                  className="fas fa-search-plus"
                />
              </td>
            </tr>
          ))}
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  editArticleJournal: (id, article) => {
    dispatch(editArticleJournal(id, article));
  },
  setArticleId: (id) => {
    dispatch(setArticleId(id));
  },

  handleSnackbar: (msg, color) => {
    dispatch(handleSnackbar(msg, color));
  },
});

export default connect(null, mapDispatchToProps)(Articles);
