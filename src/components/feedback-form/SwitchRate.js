import React, { useEffect, useState } from "react";
import { setAnswerList } from "../../redux/actions/customer-feedback/AnswerAction";
import { connect } from "react-redux";

const SwitchRate = (props) => {
  const [rate, setRate] = useState();
  const { answersList } = props.answerReducer;

  useEffect(() => {
    const updatedRate = answersList.map((answer, index) => {
      return answer.question === props.questionId
        ? { ...answer, question: props.questionId, rate: rate }
        : answer;
    });
    props.setAnswerList(updatedRate);
    console.log(rate)
  }, [rate]);

  return (
    <div className="yes-no-container">
      <div
        className={`no${rate === 1 ? " no-actif" : ""}`}
        onClick={() => setRate(1)}
      >
        <span>Non</span>
      </div>

      <div
        className={`yes${rate === 2 ? " yes-actif" : ""}`}
        onClick={() => setRate(2)}
      >
        <span>Oui!</span>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SwitchRate);
