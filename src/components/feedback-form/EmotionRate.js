import React, { useEffect, useState } from "react";
import { setAnswerList } from "../../redux/actions/customer-feedback/AnswerAction";
import { connect } from "react-redux";

const EmotionRate = (props) => {
  const [rate, setRate] = useState();
  const { answersList } = props.answerReducer;

  useEffect(() => {
    const updatedRate = answersList.map((answer, index) => {
      return answer.question === props.questionId
        ? { ...answer, question: props.questionId, rate: rate }
        : answer;
    });
    props.setAnswerList(updatedRate);
  }, [rate]);

  return (
    <div className="rate-icons">
      <img
       className={`icon-img${rate === 1 ? " actif" : ""}`}
        src="https://i.ibb.co/wC57ZS1/smiley1.png"
        alt="sport club"
        height="40px"
        width="40px"
        onClick={() => setRate(1)}
      />
      <img
       className={`icon-img${rate === 2 ? " actif" : ""}`}
       src="https://i.ibb.co/2yw42QL/smiley2.png"
        alt="sport club"
        height="40px"
        width="40px"
        onClick={() => setRate(2)}
      />
      <img
       className={`icon-img${rate === 3 ? " actif" : ""}`}
       src="https://i.ibb.co/KzzBCSs/smiley3.png"
        alt="sport club"
        height="40px"
        width="40px"
        onClick={() => setRate(3)}
      />
      <img
       className={`icon-img${rate === 4 ? " actif" : ""}`}
       src="https://i.ibb.co/K9YdSVR/smiley4.png"
        alt="sport club"
        height="40px"
        width="40px"
        onClick={() => setRate(4)}
      />
      <img
       className={`icon-img${rate === 5 ? " actif" : ""}`}
       src="https://i.ibb.co/1MTtkNT/smiley5.png"
        alt="sport club"
        height="40px"
        width="40px"
        onClick={() => setRate(5)}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setAnswerList: (answerList) => {
    dispatch(setAnswerList(answerList));
  },
});
const mapStateToProps = (state) => {
  return {
    answerReducer: state.AnswerReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmotionRate);
