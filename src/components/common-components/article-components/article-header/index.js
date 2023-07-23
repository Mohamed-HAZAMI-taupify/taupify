import React, {  useRef, useState } from "react";
import Select from "react-select";
import { typesData } from "../../../../data/articleData";
import { monthNames } from "../../../../data/MonthNames";
import { addArticleHeader } from "../../../../redux/actions/JournalActions";
import { SelectSearchStyle } from "../../../coach/gallery/select-search-style";
import { connect } from "react-redux";
import axios, { post } from "axios";
import Swal from "sweetalert2/src/sweetalert2";

const ArticleHeader = (props) => {
  var { articleHeader } = props.journalReducer;

  const createdAt = new Date(props.createdAt);
  const [file, setFile] = useState("");
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  var photoChanged = false;

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

  const onChangePhoto = async (e) => {
    const [file] = e.target.files;
    if (file && file.size < 307200) {
      setFile(e.target.files[0]);
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      const phoroUploaded = await fileUpload(file);
      await props.addArticleHeader({
        ...articleHeader,
        cover: phoroUploaded.data.data.display_url,
      });
      photoChanged = true;
    } else {
      window.alert(
        "fichier trés volumineux,Veuillez télécharger un fichier ne dépasse pas 300 K0"
      );
    }
  };

  const onChange = (e) => {
    props.addArticleHeader({
      ...articleHeader,
      [e.target.name]: e.target.value,
    });
  };

  const onTypeChange = (e) => {
    props.addArticleHeader({
      ...articleHeader,
      type: e.value,
    });
  };

  return (
    <section className="article-header">
      <div
        className="article-header-cover"
        onClick={() =>
          !props.showResult && props.actifPath === "edit"
            ? imageUploader.current.click()
            : Swal.fire({
                imageUrl: articleHeader.cover
                  ? articleHeader.cover
                  : "https://i.ibb.co/Jt2xK2k/791768-middle.png",
                imageHeight: 340,
                width: 500,
                imageAlt: "header image",
                showCancelButton: false,
                showConfirmButton: false,
                background: "#0000",
              })
        }
      >
        {!props.showResult && props.actifPath === "edit" ? (
          <input
            className="input-uploader"
            type="file"
            accept="image/*"
            onChange={onChangePhoto}
            ref={imageUploader}
          />
        ) : null}
        <img
          className="img-uploader"
          ref={uploadedImage}
          src={
            articleHeader.cover
              ? articleHeader.cover
              : "https://i.ibb.co/Jt2xK2k/791768-middle.png"
          }
        />
      </div>

      <div className="card-article-header">
        <div className="type">
          {!props.showResult && props.actifPath === "edit" ? (
            <div className="select-container">
              <Select
                options={typesData.map((e) => ({
                  label: e.label,
                  value: e.value,
                }))}
                name="type"
                value={{ value: articleHeader.type, label: articleHeader.type }}
                onChange={(e) => onTypeChange(e)}
                placeholder="Type de l'article"
                styles={SelectSearchStyle}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          ) : (
            <h1> {articleHeader.type}</h1>
          )}
        </div>
        <div className="title">
          {!props.showResult && props.actifPath === "edit" ? (
            <textarea
              className="hidden-input"
              placeholder="Titre de l'article"
              maxLength={100}
              rows="3"
              name="title"
              value={articleHeader.title}
              onChange={(e) => onChange(e)}
            />
          ) : (
            <> {articleHeader.title}</>
          )}
        </div>
        <div className="date">
          <h6>
            {props.createdAt &&
              createdAt.getDate().toString() +
                " " +
                monthNames[createdAt.getMonth()] +
                " " +
                createdAt.getFullYear().toString()}
          </h6>
        </div>
      </div>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addArticleHeader: (header) => {
    dispatch(addArticleHeader(header));
  },
});
const mapStateToProps = (state) => {
  return {
    journalReducer: state.JournalReducer,
    adminReducer: state.AdminReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ArticleHeader);
