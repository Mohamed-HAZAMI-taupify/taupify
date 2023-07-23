import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import EmotionRate from "./EmotionRate";
import { Input } from "reactstrap";
import StarRate from "./StarRate";
import NoteRate from "./NoteRate";
import { getQuestions } from "../../redux/actions/customer-feedback/QuestionAction";
import { createFeedbackForm } from "../../redux/actions/customer-feedback/FeedbackFormAction";
import {
  addAnswers,
  setAnswerList,
} from "../../redux/actions/customer-feedback/AnswerAction";
import Swal from "sweetalert2/src/sweetalert2.js";
import SwitchRate from "./SwitchRate";
import { useHistory } from "react-router-dom";

const FeedbackForm = (props) => {
  const [message, setMessage] = useState("");

  const { answersList } = props.answerReducer;
  const { feedBackFormId } = props.feedbackFormReducer;
  const history = useHistory();


  useEffect(() => {
    props.setAnswerList([
      { question: "633db787c9edd4013ff626fa" },
      { question: "633db7c6c9edd4013ff626fb" },
      { question: "633db7ebc9edd4013ff626fc" },
      { question: "633db844c9edd4013ff626fd" },
      { question: "633db86ac9edd4013ff626fe" },
      { question: "633db8c7c9edd4013ff626ff" },
      { question: "633db925c9edd4013ff62700" },
      { question: "633db94bc9edd4013ff62701" },
      { question: "633db9bcc9edd4013ff62702" },
      { question: "633db9fec9edd4013ff62703" },
      { question: "633dba38c9edd4013ff62704" },
      { question: "633dba73c9edd4013ff62705" },
    ]);
  }, []);

  useEffect(() => {
    if (feedBackFormId !== "") {
      props.addAnswers(
        answersList.filter((e) => e.rate),
        feedBackFormId
      );
    }
  }, [feedBackFormId]);

  const onSave = async () => {
    if (answersList.filter((e) => e.rate > -1).length === 0) {
      await Swal.fire(
        "On attend encore votre avis !",
        "Votre feedback nous interesse",
        "warning"
      );
    } else if (
      answersList.length === answersList.filter((e) => e.rate > -1).length
    ) {
      await props.createFeedbackForm({ message: message });

      await Swal.fire(
        "Votre feedback est soumis avec succès !",
        "Merci pour votre participation",
        "success"
      );
      history.push("/");
    } else {
      Swal.fire({
        title: "Etes-vous sûr de soumettre votre feedback?",
        text: "Il vous reste quelques avis à ajouter, votre avis nous interesse",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, Soumettre!",

        customClass: {
          cancelButton: "btn-ev btn-black",
          confirmButton: "btn-ev",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await props.createFeedbackForm({ message: message });
          await Swal.fire(
            "Votre feedback est soumis avec succès !",
            "Merci pour votre participation",
            "success"
          );
          history.push("/");
        }
      });
    }
  };

  return (
    <div className="l-container">
      <div className="brand-field">
        <img
          className="brand-logo"
          src="https://i.ibb.co/X58T9H5/logo-everest.png"
          alt="france sport club"
          height="77"
          width="547"
        ></img>
      </div>
      <div className="bg-m-size">
        <div className="form-brand">
          <h1>votre expérience est précieuse, partagez-la !</h1>
        </div>
        <div className="form-body">
          <div className="bg-form">
            <div className="underlined-title">
              <h2>
                exprimer vous suite à votre experience chez everest sport club
                besançon
              </h2>
            </div>
            <div className="question-container">
              <h3>Comment avez vous trouvé l'accueil de votre club?</h3>
              <EmotionRate questionId={"633db787c9edd4013ff626fa"} />
            </div>
            <div className="question-container">
              <h3>
                Comment avez vous trouvé la team Everest (Agents d'accueil,
                coachs)
              </h3>
              <EmotionRate questionId={"633db7c6c9edd4013ff626fb"} />
            </div>
            <div className="question-container">
              <h3>Comment avez vous trouvé les studios</h3>
              <EmotionRate questionId={"633db7ebc9edd4013ff626fc"} />
            </div>

            <div className="question-container">
              <h3>
                Comment jugez-vous l'atmosphère de votre club (propreté,
                ambiance, confort...)?
              </h3>
              <EmotionRate questionId={"633db844c9edd4013ff626fd"} />
            </div>
            <div className="question-container">
              <h3>Comment avez vous perçu le prix de l'abonnement?</h3>
              <EmotionRate questionId={"633db86ac9edd4013ff626fe"} />
            </div>

            <div className="question-container">
              <h3>
                Comment avez vous trouvé votre expérience chez Everest Sport
                Club?
              </h3>
              <EmotionRate questionId={"633db8c7c9edd4013ff626ff"} />
            </div>
            <div className="question-container">
              <h3>
                Comment avez vous trouvé expérience de votre enfant chez Everest
                Sport Club?
              </h3>
              <EmotionRate questionId={"633db925c9edd4013ff62700"} />
            </div>
            <div className="question-container">
              <h3>Quelle note attribuez-vous à Everest Sport Club?</h3>
              <StarRate questionId={"633db94bc9edd4013ff62701"} />
            </div>
            <div className=" max-height question-container">
              <h3>Recommandez-vous Everest Sport Club à votre entourage?</h3>
              <NoteRate questionId={"633db9bcc9edd4013ff62702"} />
            </div>
            <div className="max-height question-container">
              <h3>
                Avez-vous des remarques suite à votre expérience chez Everest
                Sport Club?
              </h3>
              <Input
                className="input-text-rate"
                type="textarea"
                name="text"
                id="FeedbackText"
                onChange={(e) =>setMessage(e.target.value)}
              />
            </div>
            <div className="extra-top-margin underlined-title ">
              <h2>Evaluez la qualité des autres services Everest</h2>
            </div>
            <div className="question-container">
              <h3>
                Etes-vous satisfait(e) des plats et des salades proposés par
                XB?
              </h3>
              <SwitchRate questionId={"633db9fec9edd4013ff62703"} />
            </div>
            <div className="question-container">
              <h3>
                Etes-vous satisfait(e) des services proposés par le coin
                détente Everest?
              </h3>
              <SwitchRate questionId={"633dba38c9edd4013ff62704"} />
            </div>
            <div className="question-container">
              <h3>Aimez-vous les articles de la boutique Everest?</h3>
              <SwitchRate questionId={"633dba73c9edd4013ff62705"} />
            </div>
          </div>
        </div>
        <button className="submit-button" onClick={() => onSave()}>
          Soumettre
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    questionReducer: state.QuestionReducer,
    feedbackFormReducer: state.FeedbackFormReducer,
    answerReducer: state.AnswerReducer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => {
    dispatch(getQuestions());
  },
  createFeedbackForm: (feedbackForm) => {
    dispatch(createFeedbackForm(feedbackForm));
  },
  addAnswers: (answerList, feedbackFormId) => {
    dispatch(addAnswers(answerList, feedbackFormId));
  },
  setAnswerList: (answerList) => {
    dispatch(setAnswerList(answerList));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);
