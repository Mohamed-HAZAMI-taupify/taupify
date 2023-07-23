import React , {useState} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggle } from "../../../redux/actions/AdminActions";

const PopUpResult = (props) => {
  const { title, subtitle, description } = props.data;

  const [selectedText, setSelectedText] = useState('');

  const handleCopy = () => {
    const selection = window.getSelection().toString();
    setSelectedText(selection);
    navigator.clipboard.writeText(selection);
  }

  return (
    <span className="pop-up-result">

      {
        (title && title.title) !== "" ? (
          <p
          className="title"
          onClick={handleCopy}
          style={{
            color: title && title.titleColor,
            fontSize: title && title.titleFontSize,
            fontWeight: title && title.titleFontWeight,
            fontFamily: title && title.titleFontFamily,
            fontStyle: title && title.titleFontStyle,
            textDecorationLine: title && title.titletextDecorationLine,
            textAlign: title && title.titleTextAlign,
            backgroundColor: title && title.titleBackgroundColor,
            lineHeight: title && title.titleLineHeight,
            width: title && title.titleWidth,
            margin: "auto"
          }}
        >
            {title && title.title}
        </p>
             ) : (
              <></>
             )
      }

{
        (subtitle && subtitle.subtitle) !== "" ? (
          <p
          className="subtitle"
          style={{
            color: subtitle && subtitle.SubtitleColor,
            fontSize: subtitle && subtitle.SubtitleFontSize,
            fontWeight: subtitle && subtitle.SubtitleFontWeight,
            fontFamily: subtitle && subtitle.SubtitleFontFamily,
            fontStyle: subtitle && subtitle.SubtitleFontStyle,
            textDecorationLine: subtitle && subtitle.SubtitleTextDecorationLine,
            textAlign: subtitle && subtitle.SubtitleTextAlign,
            backgroundColor: subtitle && subtitle.SubtitleBackgroundColor,
            lineHeight: subtitle && subtitle.SubtitleLineHeight,
            width: subtitle&& subtitle.SubtitleWidth,
            margin: "auto"
          }}
        >
          {subtitle && subtitle.subtitle}
        </p>
             ) : (
              <></>
             )
      }



      {
        (description && description.description) !== "" ? (
               <p
               className="description"
               style={{
                 color: description && description.descriptionColor,
                 fontSize: description && description.descriptionFontSize,
                 fontWeight: description && description.descriptionFontWeight,
                 fontFamily: description && description.descriptionFontFamily,
                 fontStyle: description && description.descriptionFontStyle,
                 textDecorationLine: description && description.descriptionTextDecorationLine,
                 textAlign: description && description.descriptionTextAlign,
                 backgroundColor: description && description.descriptionBackgroundColor,
                 lineHeight: description && description.descriptionLineHeight,
                 width: description && description.descriptionWidth,
                 margin: "auto"
               }}
             >
               {description && description.description}
             </p>
             ) : (
              <></>
             )
      }


      {props.data.button && props.data.button._content ? (
        <Link to={props.data.button._link} className="link-rdv-pop-up">
          <button
            style={{
              backgroundColor: props.data.button._backgroundColor,
              color: props.data.button._color,
            }}
            className="pop-up-botton"
            onClick={() => {
              props.toggle(props.modalToggle, false);
            }}
          >
            {props.data.button._content}
          </button>
        </Link>
      ) : null}
    </span>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});

export default connect(null, mapDispatchToProps)(PopUpResult);
