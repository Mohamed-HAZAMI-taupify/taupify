import React, { useEffect, useState } from "react";
import { setAnswerList } from "../../redux/actions/customer-feedback/AnswerAction";
import { connect } from "react-redux";

const NoteRate = (props) => {
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
    <div className="rate-by-numbers">
      <div
        className={`circle-number${rate === 1 ? " actif" : ""}`}
        onClick={() => setRate(1)}
      >
        1
      </div>
      <div
        className={`circle-number${rate === 2 ? " actif" : ""}`}
        onClick={() => setRate(2)}
      >
        2
      </div>
      <div
        className={`circle-number${rate === 3 ? " actif" : ""}`}
        onClick={() => setRate(3)}
      >
        3
      </div>
      <div
        className={`circle-number${rate === 4 ? " actif" : ""}`}
        onClick={() => setRate(4)}
      >
        4
      </div>
      <div
        className={`circle-number${rate === 5 ? " actif" : ""}`}
        onClick={() => setRate(5)}
      >
        5
      </div>
      <div
        className={`circle-number${rate === 6 ? " actif" : ""}`}
        onClick={() => setRate(6)}
      >
        6
      </div>
      <div
        className={`circle-number${rate === 7 ? " actif" : ""}`}
        onClick={() => setRate(7)}
      >
        7
      </div>
      <div
        className={`circle-number${rate === 8 ? " actif" : ""}`}
        onClick={() => setRate(8)}
      >
        8
      </div>
      <div
        className={`circle-number${rate === 9 ? " actif" : ""}`}
        onClick={() => setRate(9)}
      >
        9
      </div>
      <div
        className={`circle-number${rate === 10 ? " actif" : ""}`}
        onClick={() => setRate(10)}
      >
        10
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

export default connect(mapStateToProps, mapDispatchToProps)(NoteRate);
