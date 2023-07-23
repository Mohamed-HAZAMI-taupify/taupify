import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { toggle } from "../../../redux/actions/AdminActions";
import { connect } from "react-redux";
import axios, { post } from "axios";
import PopUpResult from "./PopUpResult";
import { ColorPicker } from "react-color-palette";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import "react-color-palette/lib/css/styles.css";
import {
  defaultFormData,
  defaultTextFieldElement,
  defaultCurrentField,
} from "../../../data/popUp";
import {
  createPopUp,
  editPopUp,
  getHomePopUp,
} from "../../../redux/actions/PopUpAction";
const PopUpEverest = (props) => {

  //addPopup,updatePopup,aspectPopup,homePopup : sont tous des boolean, ils referent qu pop up qu'on a ouvert
  const { addPopup, updatePopup, aspectPopup, homePopup } =
    props.adminReducer.modal;
  const { popupDetails, homePopupDetails } = props.popUpReducer;


  const editorRef = useRef(null);
  const uploadedImage = useRef(null);
  const uploadedBodyPhoto = useRef(null);

  //activeField:  title ou subtitle ou description ou ou bg_color ou button, ce state indique l'interface d'édit ouvert
  const [activeField, setActiveField] = useState("title");
  //currentField: ce state contient le contenu de l'élément qui est en train de se modifié
  const [currentField, setCurrentField] = useState(defaultCurrentField);
  // showResult: est un boolean, si true il nous visualise le résultat des moodification, si false on reste dans l'interface d'edit
  const [showResult, setShowResult] = useState(props.showResult);
  //textFieldElement: ce state gère l'output de l'editeur de tinymce ( title, subscription et description)
  const [textFieldElement, setTextFieldElement] = useState(
    defaultTextFieldElement
  );

  const inisialisationBgColor = {
    hex: "#ffffff",
    rgb: {
      r: 255,
      g: 255,
      b: 255,
    },
    hsv: {
      h: 0,
      s: 0,
      v: 100,
    },
  };

  const optionsWidth = [
    { label: "10%", value: "10%" },
    { label: "20%", value: "20%" },
    { label: "30%", value: "30%" },
    { label: "40%", value: "40%" },
    { label: "50%", value: "50%" },
    { label: "60%", value: "60%" },
    { label: "70%", value: "70%" },
    { label: "80%", value: "80%" },
    { label: "90%", value: "90%" },
    { label: "100%", value: "100%" },
  ];

  const optionsFontSize = [
    { label: "1px", value: "1px" },
    { label: "2px", value: "2px" },
    { label: "3px", value: "3px" },
    { label: "4px", value: "4px" },
    { label: "5px", value: "5px" },
    { label: "6px", value: "6px" },
    { label: "7px", value: "7px" },
    { label: "8px", value: "8px" },
    { label: "9px", value: "9px" },
    { label: "10px", value: "10px" },
    { label: "11px", value: "11px" },
    { label: "12px", value: "12px" },
    { label: "13px", value: "13px" },
    { label: "14px", value: "14px" },
    { label: "15px", value: "15px" },
    { label: "16px", value: "16px" },
    { label: "17px", value: "17px" },
    { label: "18px", value: "18px" },
    { label: "19px", value: "19px" },
    { label: "20px", value: "20px" },
    { label: "21px", value: "21px" },
    { label: "22px", value: "22px" },
    { label: "23px", value: "23px" },
    { label: "24px", value: "24px" },
    { label: "25px", value: "25px" },
    { label: "26px", value: "26px" },
    { label: "27px", value: "27px" },
    { label: "28px", value: "28px" },
    { label: "29px", value: "29px" },
    { label: "30px", value: "30px" },
    { label: "31px", value: "31px" },
    { label: "32px", value: "32px" },
    { label: "33px", value: "33px" },
    { label: "34px", value: "34px" },
    { label: "35px", value: "35px" },
    { label: "36px", value: "36px" },
    { label: "37px", value: "37px" },
    { label: "38px", value: "38px" },
    { label: "39px", value: "39px" },
    { label: "40px", value: "40px" },
    { label: "41px", value: "41px" },
    { label: "42px", value: "42px" },
    { label: "43px", value: "43px" },
    { label: "44px", value: "44px" },
    { label: "45px", value: "45px" },
    { label: "46px", value: "46px" },
    { label: "47px", value: "47px" },
    { label: "48px", value: "48px" },
    { label: "49px", value: "49px" },
    { label: "50px", value: "50px" },
    { label: "51px", value: "51px" },
    { label: "52px", value: "52px" },
    { label: "53px", value: "53px" },
    { label: "54px", value: "54px" },
    { label: "55px", value: "55px" },
    { label: "56px", value: "56px" },
    { label: "57px", value: "57px" },
    { label: "58px", value: "58px" },
    { label: "59px", value: "59px" },
    { label: "60px", value: "60px" },
  ];

  const optionsFontWeight = [
    { label: "100", value: "100" },
    { label: "200", value: "200" },
    { label: "300", value: "300" },
    { label: "400", value: "400" },
    { label: "500", value: "500" },
    { label: "600", value: "600" },
    { label: "700", value: "700" },
    { label: "800", value: "800" },
    { label: "900", value: "900" },
    { label: "1000", value: "1000" },
  ];

  const optionsLineHeight = [
    { label: "esp 1", value: "1" },
    { label: "esp 1.5", value: "1.5" },
    { label: "esp 2", value: "2" },
    { label: "esp 2.5", value: "2.5" },
    { label: "esp 3", value: "3" },
    { label: "esp 3.5", value: "3.5" },
    { label: "esp 4", value: "4" },
    { label: "esp 4.5", value: "4.5" },
  ];

  const optionsFontFamily = [
    { label: "Arial", value: "Arial, Helvetica, sans-serif" },
    { label: "Roman", value: "Times New Roman, Times, serif" },
    { label: "Courier", value: "Courier New, Courier, monospace" },
    { label: "Georgia", value: "Georgia, serif" },
    {
      label: "Palatino",
      value: "Palatino Linotype, Book Antiqua, Palatino, serif",
    },
    {
      label: "Lucida",
      value: "Lucida Sans Unicode, Lucida Grande, sans-serif",
    },
    { label: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
    { label: "Trebuchet", value: "Trebuchet MS, Helvetica, sans-serif" },
    { label: "Verdana", value: "Verdana, Geneva, sans-serif" },
  ];

  const [length, setLength] = useState(0);
  const [formData, setFormData] = useState(defaultFormData);
  const handlerChangeDateStart = (event) => {
    setFormData({
      ...formData,
      dateStart: event.target.value
    });
  };

  const handlerChangeDateEnd = (event) => {
    setFormData({
      ...formData,
      dateEnd: event.target.value
    });
  };
  
  ///////////////////////////////////////////// handler Title /////////////////////////////////////////////

  const handlerTitleColor = (event) => {
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        titleColor: event.target.value,
      },
    });
  };

  const handlerTitleBackgroundColor = (event) => {
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        titleBackgroundColor: event.target.value,
      },
    });
  };

  const handlerTitle = (event) => {
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        title: event.target.value,
      },
    });
  };

  const handlerTitleFontSize = (event) => {
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        titleFontSize: event.target.value,
      },
    });
  };

  const handlerTitleFontWeight = (event) => {
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        titleFontWeight: event.target.value,
      },
    });
  };

  const handlerTitleFontFamily = (event) => {
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        titleFontFamily: event.target.value,
      },
    });
  };

  const handlerClickBold = () => {
    if (!(formData.title.titleFontWeight === "1000")) {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleFontWeight: "1000",
        },
      });
    } else {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleFontWeight: "400",
        },
      });
    }
  };

  const handlerClickItalic = () => {
    if (!(formData.title.titleFontStyle === "italic")) {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleFontStyle: "italic",
        },
      });
    } else {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleFontStyle: "",
        },
      });
    }
  };

  const handlerClickTextDecorationLine = () => {
    if (formData.title.titletextDecorationLine === "underline") {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titletextDecorationLine: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titletextDecorationLine: "underline",
        },
      });
    }
  };

  const handlerClickTextDecorationlineThrough = () => {
    if (formData.title.titletextDecorationLine === "line-through") {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titletextDecorationLine: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titletextDecorationLine: "line-through",
        },
      });
    }
  };

  const handlerClickTitleTextAlignCenter = () => {
    if (formData.title.titleTextAlign === "center") {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleTextAlign: "start",
        },
      });
    } else {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleTextAlign: "center",
        },
      });
    }
  };

  const handlerClickTitleTextAlignStart = () => {
    if (formData.title.titleTextAlign === "start") {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleTextAlign: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleTextAlign: "start",
        },
      });
    }
  };

  const handlerClickTitleTextAlignEnd = () => {
    if (formData.title.titleTextAlign === "end") {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleTextAlign: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        title: {
          ...formData.title,
          titleTextAlign: "end",
        },
      });
    }
  };

  const handlerClickTitleLineHeight = (event) => {
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        titleLineHeight: event.target.value,
      },
    });
  };

  const handlerClickTitleWidth = (event) => {
    setFormData({
      ...formData,
      title: {
        ...formData.title,
        titleWidth: event.target.value,
      },
    });
  };

  ///////////////////////////////////////////// handler Subtitle /////////////////////////////////////////////
  const handlerSubtitleColor = (event) => {
    setFormData({
      ...formData,
      subtitle: {
        ...formData.subtitle,
        SubtitleColor: event.target.value,
      },
    });
  };
  const handlerSubtitleBackgroundColor = (event) => {
    setFormData({
      ...formData,
      subtitle: {
        ...formData.subtitle,
        SubtitleBackgroundColor: event.target.value,
      },
    });
  };

  const handlerSubtitle = (event) => {
    setFormData({
      ...formData,
      subtitle: {
        ...formData.subtitle,
        subtitle: event.target.value,
      },
    });
  };

  const handlerSubtitleFontSize = (event) => {
    setFormData({
      ...formData,
      subtitle: {
        ...formData.subtitle,
        SubtitleFontSize: event.target.value,
      },
    });
  };

  const handlerSubtitreFontWeight = (event) => {
    setFormData({
      ...formData,
      subtitle: {
        ...formData.subtitle,
        SubtitleFontWeight: event.target.value,
      },
    });
  };

  const handlerSubtitreFontFamily = (event) => {
    setFormData({
      ...formData,
      subtitle: {
        ...formData.subtitle,
        SubtitleFontFamily: event.target.value,
      },
    });
  };

  const handlerClickSubtitreBold = () => {
    if (!(formData.subtitle.SubtitleFontWeight === "1000")) {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleFontWeight: "1000",
        },
      });
    } else {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleFontWeight: "400",
        },
      });
    }
  };

  const handlerClickSubtitleItalic = () => {
    if (!(formData.subtitle.SubtitleFontStyle === "italic")) {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleFontStyle: "italic",
        },
      });
    } else {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleFontStyle: "",
        },
      });
    }
  };

  const handlerClickSubtitleTextDecorationLine = () => {
    if (formData.subtitle.SubtitleTextDecorationLine === "underline") {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextDecorationLine: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextDecorationLine: "underline",
        },
      });
    }
  };

  const handlerClickSubtitleTextDecorationlineThrough = () => {
    if (formData.subtitle.SubtitleTextDecorationLine === "line-through") {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextDecorationLine: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextDecorationLine: "line-through",
        },
      });
    }
  };

  const handlerClickSubtitleTextAlignCenter = () => {
    if (formData.subtitle.subtitleTextAlign === "center") {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextAlign: "start",
        },
      });
    } else {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextAlign: "center",
        },
      });
    }
  };

  const handlerClickSubtitleTextAlignStart = () => {
    if (formData.subtitle.titleTextAlign === "start") {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextAlign: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextAlign: "start",
        },
      });
    }
  };

  const handlerClickSubtitleTextAlignEnd = () => {
    if (formData.title.titleTextAlign === "end") {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextAlign: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        subtitle: {
          ...formData.subtitle,
          SubtitleTextAlign: "end",
        },
      });
    }
  };

  const handlerClickSubtitreLineHeight = (event) => {
    setFormData({
      ...formData,
      subtitle: {
        ...formData.subtitle,
        SubtitleLineHeight: event.target.value,
      },
    });
  };

  const handlerClickSubtitreWidth = (event) => {
    setFormData({
      ...formData,
      subtitle: {
        ...formData.subtitle,
        SubtitleWidth: event.target.value,
      },
    });
  };

  ///////////////////////////////////////////// handler Description /////////////////////////////////////////////
  const handlerDescriptionColor = (event) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        descriptionColor: event.target.value,
      },
    });
  };

  const handlerDescriptionBackgroundColor = (event) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        descriptionBackgroundColor: event.target.value,
      },
    });
  };

  const handlerDescription = (event) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        description: event.target.value,
      },
    });
  };

  const handlerDescriptionFontSize = (event) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        descriptionFontSize: event.target.value,
      },
    });
  };

  const handlerDescriptionFontFamily = (event) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        descriptionFontFamily: event.target.value,
      },
    });
  };

  const handlerDescriptionFontWeight = (event) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        descriptionFontWeight: event.target.value,
      },
    });
  };

  const handlerClickDescriptionBold = () => {
    if (!(formData.description.descriptionFontWeight === "1000")) {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionFontWeight: "1000",
        },
      });
    } else {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionFontWeight: "400",
        },
      });
    }
  };

  const handlerClickDescriptionItalic = () => {
    if (!(formData.description.descriptionFontStyle === "italic")) {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionFontStyle: "italic",
        },
      });
    } else {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionFontStyle: "",
        },
      });
    }
  };

  const handlerClickDescriptionTextDecorationLine = () => {
    if (formData.description.descriptionTextDecorationLine === "underline") {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextDecorationLine: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextDecorationLine: "underline",
        },
      });
    }
  };

  const handlerClickDescriptionTextDecorationlineThrough = () => {
    if (formData.description.descriptionTextDecorationLine === "line-through") {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextDecorationLine: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextDecorationLine: "line-through",
        },
      });
    }
  };

  const handlerClickDescriptionTextAlignCenter = () => {
    if (formData.description.descriptionTextAlign === "center") {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextAlign: "start",
        },
      });
    } else {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextAlign: "center",
        },
      });
    }
  };

  const handlerClickDescriptionTextAlignStart = () => {
    if (formData.description.descriptionTextAlign === "start") {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextAlign: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextAlign: "start",
        },
      });
    }
  };

  const handlerClickDescriptionTextAlignEnd = () => {
    if (formData.description.descriptionTextAlign === "end") {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextAlign: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          descriptionTextAlign: "end",
        },
      });
    }
  };

  const handlerClickDescriptionLineHeight = (event) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        descriptionLineHeight: event.target.value,
      },
    });
  };

  const handlerClickDescriptionWidth = (event) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        descriptionWidth: event.target.value,
      },
    });
  };

  useEffect(() => {
    // si on a ouvert, par le backoffice, le popup de modification ou d'aspect(de détails)
    if (updatePopup || aspectPopup) {
      setFormData({
        _id: popupDetails._id,
        title: popupDetails.title,
        subtitle: popupDetails.subtitle,
        description: popupDetails.description,
        active: popupDetails.active,
        image: popupDetails.image && {
          _url: popupDetails.image._url,
          _delete_url: popupDetails.image._delete_url,
        },
        bodyImage: popupDetails.bodyImage && {
          _url: popupDetails.bodyImage._url,
          _delete_url: popupDetails.bodyImage._delete_url,
        },
        button: popupDetails.button && {
          _link: popupDetails.button._link,
          _content: popupDetails.button._content,
          _backgroundColor: popupDetails.button._backgroundColor,
          _color: popupDetails.button._color,
        },
        isLogo: popupDetails.isLogo,
        backgroundColor: popupDetails.backgroundColor,
        dateStart: popupDetails.dateStart,
        dateEnd: popupDetails.dateEnd,
      });

      //tout en gardant les modification enregistrés par ([...textFieldElement]) on modifie le state textFieldElement selon le type(title,subtitle ou description)
      //NB: cet algorithme est similaire à l'algo utilisé par les reducer par redux
      setTextFieldElement(
        [...textFieldElement].map((object) => {
          switch (object.type) {
            case "title":
              return {
                ...object,
                data: popupDetails.title,
              };
            case "subtitle":
              return {
                ...object,
                data: popupDetails.subtitle,
              };
            case "description":
              return {
                ...object,
                data: popupDetails.description,
              };
            default:
              return object;
          }
        })
      );

      setCurrentField({
        ...currentField,
        index: 1,
        type: "title",
        data: popupDetails.title,
      });

      // si on a ouvert le pop up d'ajout, on assigne les valeurs initiaux à nos states
    } else if (addPopup) {
      setFormData(defaultFormData);
      setTextFieldElement(defaultTextFieldElement);
      setCurrentField(defaultCurrentField);
    }
  }, [updatePopup, aspectPopup, addPopup]);

  useEffect(() => {
    props.getHomePopUp();
  }, [homePopup]);

  // handleChangeType: si on change l'élément à modifier (title,subtitle,...)
  const handleChangeType = (type) => {
    if (activeField !== type) {
      setActiveField(type);
      setCurrentField(textFieldElement.find((el) => el.type === type));
    }
    return;
  };

  // onTypeChange: cette méthode fait la mise à jour du state textFieldElement lorsqu'on passe d'un élément à un autre (expl : de title vers subtitle )
  const onTypeChange = async () => {
    const updatedFields = textFieldElement.map((field) =>
      field.type === activeField ? currentField : field
    );
    setTextFieldElement(updatedFields);
  };


  const fileUpload = async (file) => {
    const url = `https://api.imgbb.com/1/upload`;
    const formData = new FormData();
    delete axios.defaults.headers.common["x-auth-token"];
    formData.append("image", file);
    formData.append("key", "881f6a30630e96747675ad6aa76cb50b");
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
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      const photoUploaded = await fileUpload(file);
      setFormData({
        ...formData,
        image: { ...formData.image, _url: photoUploaded.data.data.display_url },
      });
    } else {
      window.alert(
        "fichier très volumineux,Veuillez télécharger un fichier ne dépassant pas 300 K0"
      );
    }
  };

  const onChangeBodyPhoto = async (e) => {
    const [file] = e.target.files;
    if (file && file.size < 307200) {
      const reader = new FileReader();
      const { current } = uploadedBodyPhoto;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      const photoUploaded = await fileUpload(file);
      setFormData({
        ...formData,
        bodyImage: {
          ...formData.bodyImage,
          _url: photoUploaded.data.data.display_url,
        },
      });
    } else {
      window.alert(
        "fichier très volumineux,Veuillez télécharger un fichier ne dépassant pas 300 K0"
      );
    }
  };

  const onSave = async () => {
    if (addPopup) {
      await props.createPopUp(formData);
    } else if (updatePopup || aspectPopup) {
      await props.editPopUp(formData._id, formData);
    }
    props.toggle(props.modalToggle, false);
  };

  useEffect(() => {
    if (!props.clientSide && formData.image._url) {
      const image = new Image();
      image.src = formData.image._url;
    }
  }, [props.clientSide, formData.image._url]);

  return (
    <Modal
      isOpen={props.modalIsOpen}
      modalTransition={{ timeout: 800 }}
      transitionentertimeout={{ timeout: 10000 }}
      backdropTransition={{ timeout: 1000 }}
      toggle={() => {
        props.toggle(props.modalToggle, false);
      }}
      className="pop-up-everest"
      centered={true}
    >
      <ModalBody
        className="modal-body"
        style={{
          backgroundColor:
            formData &&
            formData.backgroundColor &&
            formData.backgroundColor.hex,
        }}
      >
        {props.clientSide ? null : (
          <div className="edit-buttons-container">
            {!showResult ? (
              <>
                <input
                  className="btn btn-secondary date"
                  type="datetime-local"
                  value={((formData.dateStart && formData.dateStart.length) === 24) ? (formData.dateStart &&  formData.dateStart.substring(0, 16)) : formData.dateStart}
                  onChange={handlerChangeDateStart}
                />
                <input
                  className="btn btn-secondary date"
                  type="datetime-local"
                  value={((formData.dateEnd && formData.dateEnd.length) === 24) ? (formData.dateEnd &&  formData.dateEnd.substring(0, 16)) : formData.dateEnd}
                  onChange={handlerChangeDateEnd}
                />
                <button
                  className="btn btn-secondary date"
                  onClick={() => {
                    onTypeChange();
                    handleChangeType("title");
                  }}
                >
                  Titre
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    onTypeChange();
                    handleChangeType("subtitle");
                  }}
                >
                  Sous-titre
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    onTypeChange();
                    handleChangeType("description");
                  }}
                >
                  Description
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    onTypeChange();
                    handleChangeType("bg_color");
                  }}
                >
                  bg-Couleur
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    onTypeChange();
                    handleChangeType("button");
                  }}
                >
                  Boutton
                </button>{" "}
              </>
            ) : null}
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowResult(!showResult);
              }}
            >
              <i
                style={{ paddingTop: "2px" }}
                className={!showResult ? "fas fa-eye" : "fas fa-edit"}
              />
            </button>
          </div>
        )}
        <section className="modal-left">
        <div className="modal-image">
      {props.clientSide ? (
        <img src={homePopupDetails.image ? homePopupDetails.image._url : ""} />
      ) : (
        <>
          <input
            className="input-image-pop-up"
            type="file"
            accept="image/*"
            onChange={onChangePhoto}
            ref={uploadedImage}
          />
          <img
            rel="preload"
            src={
              formData.image._url
                ? formData.image._url
                : "https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png"
            }
            ref={uploadedImage}
          />
          <small>
            Taille maximale : 300 Ko - Dimensions en px : (512x466)
          </small>
        </>
      )}
    </div>
        </section>
        <section
          className="modal-right-inscri"
          style={{
            backgroundColor:
              formData &&
              formData.backgroundColor &&
              formData.backgroundColor.hex,
          }}
        >
          {props.clientSide ? (
            <img
              className="image-client-poppus"
              src={
                homePopupDetails.bodyImage
                  ? homePopupDetails.bodyImage._url
                  : ""
              }
            />
          ) : (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
              }}
            >
              {formData.bodyImage ? (
                <>
                  <img
                    className="image-admin-poppus"
                    src={formData.bodyImage ? formData.bodyImage._url : ""}
                    ref={uploadedBodyPhoto}
                  />

                  {!showResult && (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onChangeBodyPhoto}
                      ref={uploadedBodyPhoto}
                      style={{ margin: "0 0 5px 40px" }}
                    />
                  )}
                </>
              ) : (
                !showResult && (
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CloudUploadIcon
                      style={{ width: "40px", height: "auto" }}
                      ref={uploadedBodyPhoto}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={onChangeBodyPhoto}
                      ref={uploadedBodyPhoto}
                      style={{ margin: "0 0 5px 40px" }}
                    />
                    <small style={{ color: "red", fontWeight: "bold" }}>
                      Taille maximale : 300 Ko - Dimensions en px : (512x466)
                    </small>
                  </span>
                )
              )}
            </span>
          )}
          {showResult || props.clientSide ? (
            <PopUpResult
              data={props.clientSide ? homePopupDetails : formData}
              modalToggle={props.modalToggle}
            />
          ) : (
            <>
              {activeField === "title" ||
              activeField === "subtitle" ||
              activeField === "description" ? (
                <div className="all-input-pop">
                  {activeField === "title" && (
                    <span>
                      <div className="form-group-textarea">
                        <label
                          for="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          <div className="select-dropdown">
                            <select
                              value={formData.title.titleWidth}
                              onChange={handlerClickTitleWidth}
                            >
                              {optionsWidth.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.title.titleFontFamily}
                              onChange={handlerTitleFontFamily}
                            >
                              {optionsFontFamily.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.title.titleFontSize}
                              onChange={handlerTitleFontSize}
                            >
                              {optionsFontSize.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.title.titleFontWeight}
                              onChange={handlerTitleFontWeight}
                            >
                              {optionsFontWeight.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.title.titleLineHeight}
                              onChange={handlerClickTitleLineHeight}
                            >
                              {optionsLineHeight.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </label>
                        <span>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              id="color-btn-pop-up"
                              className="textarea-pop-color"
                              type="color"
                              value={formData.title.titleBackgroundColor}
                              onChange={handlerTitleBackgroundColor}
                            />
                            <input
                              id="color-btn-pop-up"
                              className="textarea-pop-color"
                              type="color"
                              value={formData.title.titleColor}
                              onChange={handlerTitleColor}
                            />
                            <button
                              className={
                                formData.title.titleTextAlign === "start"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickTitleTextAlignStart}
                            >
                              <FormatAlignLeftIcon />
                            </button>
                            <button
                              className={
                                formData.title.titleTextAlign === "center"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickTitleTextAlignCenter}
                            >
                              <FormatAlignJustifyIcon />
                            </button>
                            <button
                              className={
                                formData.title.titleTextAlign === "end"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickTitleTextAlignEnd}
                            >
                              <FormatAlignRightIcon />
                            </button>
                            {/* <button
                            className="btn btn-secondary"
                            //className="btn btn-primary"
                            style={{
                              margin: "5px"
                            }}
                          >
                            <FormatListBulletedIcon/>
                          </button>
                          <button
                            className="btn btn-secondary"
                            //className="btn btn-primary"
                            style={{
                              margin: "5px"
                            }}
                          >
                            <FormatListNumberedIcon/>
                          </button> */}
                            <button
                              className={
                                formData.title.titleFontWeight === "1000"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickBold}
                            >
                              <FormatBoldIcon />
                            </button>
                            <button
                              className={
                                formData.title.titleFontStyle
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickItalic}
                            >
                              <FormatItalicIcon />
                            </button>
                            <button
                              className={
                                formData.title.titletextDecorationLine ===
                                "underline"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickTextDecorationLine}
                            >
                              <FormatUnderlinedIcon />
                            </button>
                            <button
                              className={
                                formData.title.titletextDecorationLine ===
                                "line-through"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickTextDecorationlineThrough}
                            >
                              <StrikethroughSIcon />
                            </button>
                          </span>
                        </span>
                      </div>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        type="text"
                        value={formData.title.title}
                        onChange={handlerTitle}
                        style={{
                          color: formData.title.titleColor,
                          fontSize: formData.title.titleFontSize,
                          fontWeight: formData.title.titleFontWeight,
                          fontFamily: formData.title.titleFontFamily,
                          fontStyle: formData.title.titleFontStyle,
                          textDecorationLine:
                            formData.title.titletextDecorationLine,
                          textAlign: formData.title.titleTextAlign,
                          backgroundColor: formData.title.titleBackgroundColor,
                          lineHeight: formData.title.titleLineHeight,
                          width: formData.title.descriptionWidth,
                        }}
                      ></textarea>
                    </span>
                  )}

                  {activeField === "subtitle" && (
                    <span>
                      <div className="form-group-textarea">
                        <label
                          for="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          <div className="select-dropdown">
                            <select
                              value={formData.subtitle.SubtitleWidth}
                              onChange={handlerClickSubtitreWidth}
                            >
                              {optionsWidth.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.subtitle.SubtitleFontFamily}
                              onChange={handlerSubtitreFontFamily}
                            >
                              {optionsFontFamily.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.subtitle.SubtitleFontSize}
                              onChange={handlerSubtitleFontSize}
                            >
                              {optionsFontSize.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="select-dropdown">
                            <select
                              value={formData.subtitle.SubtitleFontWeight}
                              onChange={handlerSubtitreFontWeight}
                            >
                              {optionsFontWeight.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.subtitle.SubtitleLineHeight}
                              onChange={handlerClickSubtitreLineHeight}
                            >
                              {optionsLineHeight.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </label>
                        <span>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              id="color-btn-pop-up"
                              className="textarea-pop-color"
                              type="color"
                              value={formData.subtitle.SubtitleBackgroundColor}
                              onChange={handlerSubtitleBackgroundColor}
                            />
                            <input
                              id="color-btn-pop-up"
                              className="textarea-pop-color"
                              type="color"
                              value={formData.subtitle.SubtitleColor}
                              onChange={handlerSubtitleColor}
                            />
                            <button
                              className={
                                formData.subtitle.SubtitleTextAlign === "start"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickSubtitleTextAlignStart}
                            >
                              <FormatAlignLeftIcon />
                            </button>
                            <button
                              className={
                                formData.subtitle.SubtitleTextAlign === "center"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickSubtitleTextAlignCenter}
                            >
                              <FormatAlignJustifyIcon />
                            </button>
                            <button
                              className={
                                formData.subtitle.SubtitleTextAlign === "end"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickSubtitleTextAlignEnd}
                            >
                              <FormatAlignRightIcon />
                            </button>
                            {/* <button
                            className="btn btn-secondary"
                            //className="btn btn-primary"
                            style={{
                              margin: "5px"
                            }}
                          >
                            <FormatListBulletedIcon/>
                          </button>
                          <button
                            className="btn btn-secondary"
                            //className="btn btn-primary"
                            style={{
                              margin: "5px"
                            }}
                          >
                            <FormatListNumberedIcon/>
                          </button> */}
                            <button
                              className={
                                formData.subtitle.SubtitleFontWeight === "1000"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickSubtitreBold}
                            >
                              <FormatBoldIcon />
                            </button>
                            <button
                              className={
                                formData.subtitle.SubtitleFontStyle
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickSubtitleItalic}
                            >
                              <FormatItalicIcon />
                            </button>
                            <button
                              className={
                                formData.subtitle.SubtitleTextDecorationLine ===
                                "underline"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickSubtitleTextDecorationLine}
                            >
                              <FormatUnderlinedIcon />
                            </button>
                            <button
                              className={
                                formData.subtitle.SubtitleTextDecorationLine ===
                                "line-through"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={
                                handlerClickSubtitleTextDecorationlineThrough
                              }
                            >
                              <StrikethroughSIcon />
                            </button>
                          </span>
                        </span>
                      </div>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        type="text"
                        value={formData.subtitle.subtitle}
                        onChange={handlerSubtitle}
                        style={{
                          color: formData.subtitle.SubtitleColor,
                          fontSize: formData.subtitle.SubtitleFontSize,
                          fontWeight: formData.subtitle.SubtitleFontWeight,
                          fontFamily: formData.subtitle.SubtitleFontFamily,
                          fontStyle: formData.subtitle.SubtitleFontStyle,
                          textDecorationLine:
                            formData.subtitle.SubtitleTextDecorationLine,
                          textAlign: formData.subtitle.SubtitleTextAlign,
                          backgroundColor:
                            formData.subtitle.SubtitleBackgroundColor,
                          lineHeight: formData.subtitle.SubtitleLineHeight,
                          width: formData.subtitle.SubtitleWidth,
                        }}
                      ></textarea>
                    </span>
                  )}

                  {activeField === "description" && (
                    <span>
                      <div className="form-group-textarea">
                        <label
                          for="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          <div className="select-dropdown">
                            <select
                              value={formData.description.descriptionWidth}
                              onChange={handlerClickDescriptionWidth}
                            >
                              {optionsWidth.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.description.descriptionFontFamily}
                              onChange={handlerDescriptionFontFamily}
                            >
                              {optionsFontFamily.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.description.descriptionFontSize}
                              onChange={handlerDescriptionFontSize}
                            >
                              {optionsFontSize.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="select-dropdown">
                            <select
                              value={formData.description.descriptionFontWeight}
                              onChange={handlerDescriptionFontWeight}
                            >
                              {optionsFontWeight.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="select-dropdown">
                            <select
                              value={formData.description.descriptionLineHeight}
                              onChange={handlerClickDescriptionLineHeight}
                            >
                              {optionsLineHeight.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </label>
                        <span>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <input
                              id="color-btn-pop-up"
                              className="textarea-pop-color"
                              type="color"
                              value={
                                formData.description.descriptionBackgroundColor
                              }
                              onChange={handlerDescriptionBackgroundColor}
                            />
                            <input
                              id="color-btn-pop-up"
                              className="textarea-pop-color"
                              type="color"
                              value={formData.description.descriptionColor}
                              onChange={handlerDescriptionColor}
                            />
                            <button
                              className={
                                formData.description.descriptionTextAlign ===
                                "start"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickDescriptionTextAlignStart}
                            >
                              <FormatAlignLeftIcon />
                            </button>
                            <button
                              className={
                                formData.description.descriptionTextAlign ===
                                "center"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickDescriptionTextAlignCenter}
                            >
                              <FormatAlignJustifyIcon />
                            </button>
                            <button
                              className={
                                formData.description.descriptionTextAlign ===
                                "end"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickDescriptionTextAlignEnd}
                            >
                              <FormatAlignRightIcon />
                            </button>
                            {/* <button
                            className="btn btn-secondary"
                            //className="btn btn-primary"
                            style={{
                              margin: "5px"
                            }}
                          >
                            <FormatListBulletedIcon/>
                          </button>
                          <button
                            className="btn btn-secondary"
                            //className="btn btn-primary"
                            style={{
                              margin: "5px"
                            }}
                          >
                            <FormatListNumberedIcon/>
                          </button> */}
                            <button
                              className={
                                formData.description.descriptionFontWeight ===
                                "1000"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickDescriptionBold}
                            >
                              <FormatBoldIcon />
                            </button>
                            <button
                              className={
                                formData.description.descriptionFontStyle
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={handlerClickDescriptionItalic}
                            >
                              <FormatItalicIcon />
                            </button>
                            <button
                              className={
                                formData.description
                                  .descriptionTextDecorationLine === "underline"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={
                                handlerClickDescriptionTextDecorationLine
                              }
                            >
                              <FormatUnderlinedIcon />
                            </button>
                            <button
                              className={
                                formData.description
                                  .descriptionTextDecorationLine ===
                                "line-through"
                                  ? "btn btn-primary"
                                  : "btn btn-secondary"
                              }
                              style={{ margin: "5px" }}
                              onClick={
                                handlerClickDescriptionTextDecorationlineThrough
                              }
                            >
                              <StrikethroughSIcon />
                            </button>
                          </span>
                        </span>
                      </div>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        type="text"
                        value={formData.description.description}
                        onChange={handlerDescription}
                        style={{
                          color: formData.description.descriptionColor,
                          fontSize: formData.description.descriptionFontSize,
                          fontWeight:
                            formData.description.descriptionFontWeight,
                          fontFamily:
                            formData.description.descriptionFontFamily,
                          fontStyle: formData.description.descriptionFontStyle,
                          textDecorationLine:
                            formData.description.descriptionTextDecorationLine,
                          textAlign: formData.description.descriptionTextAlign,
                          backgroundColor:
                            formData.description.descriptionBackgroundColor,
                          lineHeight:
                            formData.description.descriptionLineHeight,
                          width: formData.description.descriptionWidth,
                        }}
                      ></textarea>
                    </span>
                  )}
                </div>
              ) : activeField === "bg_color" ? (
                <div className="color-picker">
                  <ColorPicker
                    width={300}
                    height={100}
                    color={
                      formData.backgroundColor
                        ? formData.backgroundColor
                        : inisialisationBgColor
                    }
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        backgroundColor: event,
                      });
                    }}
                    hideRGB
                    hideHEX
                    hideHSV
                    dark
                  />
                </div>
              ) : activeField === "button" ? (
                <>
                  <input
                    style={{
                      backgroundColor: formData.button._backgroundColor,
                      color: formData.button._color,
                    }}
                    maxLength={25}
                    className="pop-up-botton-input-content"
                    type="text"
                    placeholder="Changez le contenu du Boutton"
                    value={formData.button._content}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        button: {
                          ...formData.button,
                          _content: e.target.value,
                        },
                      })
                    }
                  />

                  <div className="pop-up-botton-input-link">
                    <label htmlFor="link-pop-up">lien du boutton :</label>
                    <input
                      id="link-pop-up"
                      type="text"
                      value={formData.button._link}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          button: { ...formData.button, _link: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="pop-up-botton-input-color">
                    <label htmlFor="color-btn-pop-up">
                      couleur du boutton :
                    </label>
                    <input
                      id="color-btn-pop-up"
                      type="color"
                      value={formData.button._backgroundColor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          button: {
                            ...formData.button,
                            _backgroundColor: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="pop-up-botton-input-color">
                    <label htmlFor="color-btn-pop-up">
                      couleur texte du boutton :
                    </label>
                    <input
                      id="color-btn-pop-up"
                      type="color"
                      value={formData.button._color}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          button: {
                            ...formData.button,
                            _color: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </>
              ) : null}
            </>
          )}
          {props.clientSide ? null : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "5px",
              }}
            >
              <button className="btn btn-secondary" onClick={onSave}>
                ENREGISTRER
              </button>
            </div>
          )}
        </section>
        <i
          className="fas fa-times modal-x-icon"
          onClick={() => {
            props.toggle(props.modalToggle, false);
          }}
        />
      </ModalBody>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
    popUpReducer: state.PopUpReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  editPopUp: (id, popUp) => {
    dispatch(editPopUp(id, popUp));
  },
  createPopUp: (popUp) => {
    dispatch(createPopUp(popUp));
  },
  getHomePopUp: () => {
    dispatch(getHomePopUp());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PopUpEverest);