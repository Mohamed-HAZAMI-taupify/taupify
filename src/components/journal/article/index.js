import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import { Card } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ArticleHeader from "../../common-components/article-components/article-header";
import TextEditor from "../../common-components/input-toolbar";
import { connect } from "react-redux";
import {
  addArticleContent,
  addArticleHeader,
  editorCurrent,
} from "../../../redux/actions/JournalActions";
import ReactHtmlParser from "react-html-parser";
import FadeIn from "react-fade-in";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  editArticleJournal,
  getArticleJournalById,
} from "../../../redux/actions/ArticleJournalActions";
import Swal from "sweetalert2/src/sweetalert2";
import axios, { post } from "axios";
import { actifPath } from "../../../redux/actions/AdminActions";
import { LOAD_ARTICLES_BY_TYPE } from "../../graphQL/Queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import NotFoundBody from "../../common-components/not-found/Body";
import WhiteSpinnerLoading from "../../common-components/spinner-loanding/WhiteSpinnerLoading";
import {
  handleSnackbar,
  handleWaitSnackbar,
} from "../../../redux/actions/AlertActions";
import UploadPhoto from "../../common-components/upload-photo/UploadPhoto";
import ImageLoader from "../../common-components/image-loader";
import { data } from "../../../data/routes/routesData";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const Article = (props) => {
  // editorValue: l'output de l'éditeur de tinymce
  // articleContent: une liste d'objets qui ont comme attributs :indexContent (index) , type (title ou description ou video ou image) , field (contenu)
  // articleHeader: le cover de l'article (photo de couverture, title, type, date de submit)
  // articleJournalById: un get du BD de l'article à modifier
  // loading:etat de chargement de l'article
  var {
    editorValue,
    articleContent,
    articleHeader,
    articleJournalById,
    loading,
  } = props.journalReducer;
  const { actifPath } = props.adminReducer;

  //showResult : boolean, si true il nous affiche la version client de l'article
  const [showResult, setShowResult] = useState(false);
  //idEditing : id de la section qu'on est en train de modifier
  const [idEditing, setIdEditing] = useState(-1);
  //currentSection : le contenu de la section  qu'on est en train de modifier
  const [currentSection, setCurrentSection] = useState({});
  //articleId : l'id de l'article ouvert
  const [articleId, setArticleId] = useState();
  // articleSimilaires: les articles qui ont le meme type des articles ouverts
  const [articleSimilaires, setArticleSimilaires] = useState([]);
  // loadingImage: décrit l'état du chargement de l'image
  const [loadingImage, setLoadingImage] = useState("initial");

  const uploadedImage = useRef(null);

  const pathSplitted = window.location.href.split("/");
  const { field } = currentSection;

  const { data: dataByType } = useQuery(LOAD_ARTICLES_BY_TYPE, {
    variables: { type: articleJournalById.type },
  });


  useEffect(() => {
    props.actifPath();
    setArticleId(pathSplitted[pathSplitted.length - 2]);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    articleId && props.getArticleJournalById(articleId);
  }, [articleId]);

  useEffect(() => {
    setCurrentSection({ ...currentSection, field: editorValue });
  }, [editorValue]);

  // editorValue: cet effet nous fournit le contenu de l'article qui existe déjà (en cas de modification)
  useEffect(() => {
    props.addArticleContent(articleJournalById.content);
    props.addArticleHeader({
      _id: articleJournalById._id,
      title: articleJournalById.title,
      type: articleJournalById.type,
      createdAt: articleJournalById.createdAt,
      createdBy: articleJournalById.createdBy,
      state: articleJournalById.state,
      priority: articleJournalById.priority,
      visitor_count: articleJournalById.visitor_count,
      updated: articleJournalById.updated,
      archived: articleJournalById.archived,
      cover: articleJournalById.cover,
    });
    if (dataByType) {
      setArticleSimilaires(dataByType.getArticleByType);
    }
  }, [articleJournalById.content, dataByType]);

  const onChange = (e) => {
    setCurrentSection({ ...currentSection, field: e.target.value });
  };

  // handleAddSection: en cliquant sur le boutton (+) d'ajout d'une section dans un article
  const handleAddSection = async () => {
    // indexList : liste des index des sections de l'article
    var indexList = await articleContent
      .map((el) => el.indexContent)
      .sort((a, b) => {
        return a - b;
      });
    // biggestIndex : le plus grand index, ce variable est utile pour qu'on puisse assigné à la section ajoutée l'index le plus grand
    var biggestIndex = await indexList[indexList.length - 1];
    // createdSection : décrit le card d'ajout qui s'affiche en cliquant sur le boutton d'ajout (+)
    const createdSection = [
      ...articleContent,
      {
        indexContent: biggestIndex + 1,
        type: "",
        field: "",
      },
    ];
    props.addArticleContent(createdSection);
  };

  const handleDeleteSection = async (id) => {
    // indexOfDelete : indice de la section à supprimer
    var indexOfDelete = await articleContent.findIndex(
      (el) => el.indexContent === id
    );
    await articleContent.splice(indexOfDelete, 1);

    Swal.fire({
      title: "Etes-vous sûr?",
      text: "Etes-vous sûr de supprimer cet élément ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        // on mis à jour l'article par le nouveau articleContent

        props.addArticleContent(articleContent);

        // articleContent.length === 0 càd si on a supprimer tous les section, dans ce cas on visualise le card d'ajout
        if (articleContent.length === 0) {
          // visualisation du card d'ajout
          const createdSection = [
            {
              indexContent: 1,
              type: "",
              field: "",
            },
          ];
          props.addArticleContent(createdSection);
        }
        props.handleSnackbar(
          "Element supprimé avec succès, Veuillez enregistrer vos modifications",
          "success"
        );
      }
    });
  };

  // on cliquant sur l'icon de modification
  const handleEditClick = async (section, id, editedType) => {
    // le currectSection prend le contenu de la section selectionné et son type
    await setCurrentSection({ ...section, type: editedType });
    //on mis à jour l'id de section à modifier
    await setIdEditing(id);
  };

  const handleUpdateSection = async (index) => {
    //en validant la modication, on map notre liste et si l'index de la section qu'on
    const updatedSections = await articleContent.map((section) =>
      section.indexContent === index ? currentSection : section
    );
    props.handleWaitSnackbar("Validation en cours", "info", false);
    await props.addArticleContent(updatedSections);
    setIdEditing(-1);
    props.handleSnackbar(
      "Element validé avec succès, veuillez enregistrer vos modifications !",
      "success"
    );
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateSection(idEditing);
  };

  const onUpdate = async () => {
    props.editArticleJournal(articleId, {
      ...articleHeader,
      content: articleContent,
    });
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(articleContent);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    props.addArticleContent(items);
  }

  const onChangePhoto = async (e) => {
    const [file] = e.target.files;
    if (file && file.size < 307200) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        e.target.result && setLoadingImage("loading");
        current.src = e.target.result;
      };

      reader.readAsDataURL(file);

      const phoroUploaded = await fileUpload(file);
      setCurrentSection({
        ...currentSection,
        field: phoroUploaded.data.data.display_url,
      });
      phoroUploaded.data.data.display_url && setLoadingImage("finish");
    } else {
      window.alert(
        "fichier trés volumineux,Veuillez télécharger un fichier ne dépassant pas 300 K0"
      );
    }
  };

  const fileUpload = async (file) => {
    const url = `https://api.imgbb.com/1/upload`;
    const formData = new FormData();
    await delete axios.defaults.headers.common["x-auth-token"];
    await formData.append("image", file);
    await formData.append("key", "881f6a30630e96747675ad6aa76cb50b");
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  };

  if (loading) {
    return (
      <>
        <WhiteSpinnerLoading loading={loading} />;
      </>
    );
  }

  return !articleJournalById && !loading ? (
    <NotFoundBody />
  ) : (
    <div className="article-interface">
      <ArticleHeader
        id={articleJournalById._id}
        title={articleJournalById.title}
        type={articleJournalById.type}
        cover={articleJournalById.cover}
        createdAt={articleJournalById.createdAt}
        showResult={showResult}
        actifPath={actifPath}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <section {...provided.droppableProps} ref={provided.innerRef}>
              {articleContent &&
                articleContent.map((el, index, arr) => {
                  return (
                    <Draggable
                      key={el.indexContent}
                      draggableId={el.indexContent.toString()}
                      index={index}
                      isDragDisabled={actifPath === "display"}
                    >
                      {(provided) => (
                        <div
                          className="section-container"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={el.id}
                        >
                          {idEditing === el.indexContent &&
                          !showResult &&
                          actifPath === "edit" ? (
                            <div id={el.indexContent}>
                              {currentSection.type === "title" ? (
                                <TextField
                                  className="edit-title"
                                  placeholder="ajouter title"
                                  value={field}
                                  onChange={(e) => onChange(e)}
                                />
                              ) : null}
                              {currentSection.type === "description" ? (
                                <TextEditor value={el.field} />
                              ) : null}
                              {currentSection.type === "video" ? (
                                <TextField
                                  className="edit-title"
                                  placeholder="ajouter le lien YouTube du vidéo"
                                  value={field}
                                  onChange={(e) => onChange(e)}
                                />
                              ) : null}
                              {currentSection.type === "image" ? (
                                <UploadPhoto
                                  firstImageSrc="https://i.ibb.co/YkySX1P/image-add-landscape-icon-206405.png"
                                  onChangeImage={onChangePhoto}
                                  uploadedImage={uploadedImage}
                                />
                              ) : null}

                              <div className="validation-btn-container">
                                <button
                                  className={`btn-ev btn-m  ${
                                    !field ? "disabled" : " btn-black"
                                  }`}
                                  disabled={!field}
                                  onClick={handleEditFormSubmit}
                                >
                                  {loadingImage === "loading" && !field ? (
                                    <PulseLoader color="#ffff" size={10} />
                                  ) : (
                                    <>Valider</>
                                  )}
                                </button>
                                <button
                                  className="btn-ev btn-m btn-black"
                                  onClick={() => {
                                    if (el.field === field) {
                                      setIdEditing(-1);
                                      setLoadingImage("initial");
                                    } else {
                                      Swal.fire({
                                        title: "Etes-vous sûr?",
                                        text: "Etes-vous sûr d'annuler vos modifications ?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonText: "Oui, Anuler !",
                                        cancelButtonText: "Non !",
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                          setLoadingImage("initial");
                                          setIdEditing(-1);
                                        }
                                      });
                                    }
                                  }}
                                >
                                  Annuler
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {el.type ? (
                                <div className="article-content">
                                  {el.type === "title" && (
                                    <div className="text-container text-container-edit">
                                      {!showResult && actifPath === "edit" && (
                                        <div className="edit-icon-container">
                                          <div className="edit-icon">
                                            <span
                                              className="fa-stack fa-2x"
                                              onClick={() =>
                                                handleEditClick(
                                                  el,
                                                  el.indexContent,
                                                  "title"
                                                )
                                              }
                                            >
                                              <i className="fas fa-circle fa-stack-2x"></i>
                                              <i className="fas fa-pencil-alt fa-stack-1x fa-inverse"></i>
                                            </span>
                                          </div>
                                          <div
                                            className="delete-icon"
                                            onClick={() => {
                                              handleDeleteSection(
                                                el.indexContent
                                              );
                                            }}
                                          >
                                            <span className="fa-stack fa-2x">
                                              <i className="fas fa-circle fa-stack-2x"></i>
                                              <i className="fas fa-trash-alt fa-stack-1x fa-inverse"></i>
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      <h1
                                        onDoubleClick={() =>
                                          handleEditClick(
                                            el,
                                            el.indexContent,
                                            "title"
                                          )
                                        }
                                      >
                                        {el.field}
                                      </h1>
                                    </div>
                                  )}
                                  {el.type === "description" && (
                                    <div className="text-container text-container-edit">
                                      {!showResult && actifPath === "edit" && (
                                        <div className="edit-icon-container">
                                          <div className="edit-icon">
                                            <span
                                              className="fa-stack fa-2x"
                                              onClick={() =>
                                                handleEditClick(
                                                  el,
                                                  el.indexContent,
                                                  "description"
                                                )
                                              }
                                            >
                                              <i className="fas fa-circle fa-stack-2x"></i>
                                              <i className="fas fa-pencil-alt fa-stack-1x fa-inverse"></i>
                                            </span>
                                          </div>

                                          <div
                                            className="delete-icon"
                                            onClick={() => {
                                              handleDeleteSection(
                                                el.indexContent
                                              );
                                            }}
                                          >
                                            <span className="fa-stack fa-2x">
                                              <i className="fas fa-circle fa-stack-2x"></i>
                                              <i className="fas fa-trash-alt fa-stack-1x fa-inverse"></i>
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      <div
                                        onDoubleClick={() =>
                                          handleEditClick(
                                            el,
                                            el.indexContent,
                                            "description"
                                          )
                                        }
                                      >
                                        {ReactHtmlParser(el.field)}
                                      </div>
                                    </div>
                                  )}

                                  {el.type === "image" && (
                                    <div
                                      className="
                                    article-image 
                                    text-conmaxlengthtainer text-container-edit"
                                    >
                                      {!showResult && actifPath === "edit" && (
                                        <div className="edit-icon-container">
                                          <div className="edit-icon">
                                            <span
                                              className="fa-stack fa-2x"
                                              onClick={() =>
                                                handleEditClick(
                                                  el,
                                                  el.indexContent,
                                                  "image"
                                                )
                                              }
                                            >
                                              <i className="fas fa-circle fa-stack-2x"></i>
                                              <i className="fas fa-pencil-alt fa-stack-1x fa-inverse"></i>
                                            </span>
                                          </div>

                                          <div
                                            className="delete-icon"
                                            onClick={() => {
                                              handleDeleteSection(
                                                el.indexContent
                                              );
                                            }}
                                          >
                                            <span className="fa-stack fa-2x">
                                              <i className="fas fa-circle fa-stack-2x"></i>
                                              <i className="fas fa-trash-alt fa-stack-1x fa-inverse"></i>
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      <img src={el.field} />
                                    </div>
                                  )}

                                  {el.type === "video" && (
                                    <div className="article-video text-container text-container-edit">
                                      {!showResult && actifPath === "edit" && (
                                        <div className="edit-icon-container">
                                          <div className="edit-icon">
                                            <span
                                              className="fa-stack fa-2x"
                                              onClick={() =>
                                                handleEditClick(
                                                  el,
                                                  el.indexContent,
                                                  "video"
                                                )
                                              }
                                            >
                                              <i className="fas fa-circle fa-stack-2x"></i>
                                              <i className="fas fa-pencil-alt fa-stack-1x fa-inverse"></i>
                                            </span>
                                          </div>
                                          <div
                                            className="delete-icon"
                                            onClick={() => {
                                              handleDeleteSection(
                                                el.indexContent
                                              );
                                            }}
                                          >
                                            <span className="fa-stack fa-2x">
                                              <i className="fas fa-circle fa-stack-2x"></i>
                                              <i className="fas fa-trash-alt fa-stack-1x fa-inverse"></i>
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                      <iframe
                                        className="video-section desktop"
                                        frameBorder="0"
                                        allowFullScreen
                                        src={
                                          "https://www.youtube.com/embed/" +
                                          el.field.split("?v=")[1].split("&")[0]
                                        }
                                      ></iframe>
                                    </div>
                                  )}
                                </div>
                              ) : null}
                              <div className="add-section-container">
                                {!el.field &&
                                  !showResult &&
                                  actifPath === "edit" && (
                                    <FadeIn>
                                      <Card className="card-add-section">
                                        <div className="delete-icon">
                                          <span
                                            className="fa-stack fa-2x"
                                            onClick={() =>
                                              handleDeleteSection(
                                                el.indexContent
                                              )
                                            }
                                          >
                                            <i className="fas fa-circle fa-stack-2x"></i>
                                            <i className="fas fa-trash-alt fa-stack-1x fa-inverse"></i>
                                          </span>
                                        </div>
                                        <Card
                                          className="card-btn-add"
                                          onClick={() =>
                                            handleEditClick(
                                              el,
                                              el.indexContent,
                                              "title"
                                            )
                                          }
                                        >
                                          Ajouter Titre
                                        </Card>
                                        <Card
                                          className="card-btn-add"
                                          onClick={() =>
                                            handleEditClick(
                                              el,
                                              el.indexContent,
                                              "description"
                                            )
                                          }
                                        >
                                          Ajouter Texte
                                        </Card>
                                        <Card
                                          className="card-btn-add"
                                          onClick={() =>
                                            handleEditClick(
                                              el,
                                              el.indexContent,
                                              "image"
                                            )
                                          }
                                        >
                                          Ajouter Image
                                        </Card>
                                        <Card
                                          className="card-btn-add"
                                          onClick={() =>
                                            handleEditClick(
                                              el,
                                              el.indexContent,
                                              "video"
                                            )
                                          }
                                        >
                                          Ajouter Vidéo
                                        </Card>
                                      </Card>
                                    </FadeIn>
                                  )}
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
              {!showResult && actifPath === "edit" && (
                <div
                  className="add-icon"
                  onClick={async () => {
                    await handleAddSection();
                  }}
                >
                  <span className="fa-stack fa-2x">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                  </span>
                </div>
              )}
            </section>
          )}
        </Droppable>
      </DragDropContext>
      {actifPath === "edit" && (
        <button
          className="btn-ev btn-m btn-black uppercase btn-show-result"
          onClick={() => setShowResult(!showResult)}
        >
          {showResult ? <>Rédiger</> : <>Résultat</>}
        </button>
      )}

      {articleContent && articleJournalById.content && actifPath === "edit" && (
        <button
          className={`btn-ev btn-m btn-update ${
            articleJournalById.content === articleContent &&
            articleHeader.title === articleJournalById.title &&
            articleHeader.cover === articleJournalById.cover
              ? "disabled"
              : " btn-black"
          }`}
          disabled={
            articleJournalById.content === articleContent &&
            articleHeader.title === articleJournalById.title &&
            articleHeader.cover === articleJournalById.cover
          }
          onClick={() => {
            onUpdate();
          }}
        >
          ENREGISTRER
        </button>
      )}
      {articleSimilaires.length !== 1 ? (
        <section className="article-similaires">
          <h1 className="title-xl">Articles similaires</h1>
          <div className="journal-interface">
            <section className="section-cards">
              <Carousel
                responsive={responsive}
                ssr
                containerClass="container-with-dots"
                itemClass="image-item"
                deviceType={props.deviceType}
              >
                {articleSimilaires.map((el, index) =>
                  el.id !== articleJournalById._id ? (
                    <Card style={{ width: "18rem" }} key={index}>
                      <Link
                        to={`${data.journal}${data.article}/${el.id}/display`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="trainer-item-container"
                      >
                        <ImageLoader
                          src={el.cover}
                          className="img-carousel-journal"
                        />
                        <div className="container-journal-titles">
                          <h5> {el.title} </h5>
                          <p> {el.type} </p>
                          <p className="lire-plus">Lire plus</p>
                        </div>
                      </Link>
                    </Card>
                  ) : null
                )}
              </Carousel>
            </section>
          </div>
        </section>
      ) : null}
      {/* 
      <section className="article-commentaire">
        <h1 className="title-xl">vos commentaires</h1>
        <h5 className="title-m">Donnez votre avis</h5>
        <div className="commentaire-inputs">
          <textarea
            placeholder="Commentaires"
            id="story"
            name="story"
            rows="5"
          />
        </div>
        <div className="commentaire-inputs">
          <input className="info-perso-input" placeholder="Nom" />
          <input className="info-perso-input" placeholder="Adresse mail" />
          <button className="btn-ev btn-m btn-black uppercase btn-envoyer ">
            Envoyer
          </button>
        </div>
      </section> */}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  actifPath: () => {
    dispatch(actifPath());
  },
  handleSnackbar: (msg, icon) => {
    dispatch(handleSnackbar(msg, icon));
  },
  handleWaitSnackbar: (msg, icon) => {
    dispatch(handleWaitSnackbar(msg, icon));
  },
  addArticleContent: (article) => {
    dispatch(addArticleContent(article));
    dispatch(editorCurrent(article));
  },
  getArticleJournalById: (id) => {
    dispatch(getArticleJournalById(id));
  },
  addArticleHeader: (header) => {
    dispatch(addArticleHeader(header));
  },
  
  editArticleJournal: (id, article) => {
    dispatch(editArticleJournal(id, article));
  },
});
const mapStateToProps = (state) => {
  return {
    journalReducer: state.JournalReducer,
    adminReducer: state.AdminReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Article);
