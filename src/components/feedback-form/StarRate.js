import React, { useEffect, useState } from "react";
import { setAnswerList } from "../../redux/actions/customer-feedback/AnswerAction";
import { connect } from "react-redux";

const StarRate = (props) => {
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
    <div className="container-espa container-votre-avis">
      <div className="vote">
        <div className="rate">
          <input
            onClick={() => setRate(5)}
            type="radio"
            id="star5"
            name="rate"
            value="5"
          />
          <label htmlFor="star5" title="😁">
            5 stars
          </label>
          <input
            onClick={() => setRate(4)}
            type="radio"
            id="star4"
            name="rate"
            value="4"
          />
          <label htmlFor="star4" title="😀">
            4 stars
          </label>
          <input
            onClick={() => setRate(3)}
            type="radio"
            id="star3"
            name="rate"
            value="3"
          />
          <label htmlFor="star3" title="🙂">
            3 stars
          </label>
          <input
            onClick={() => setRate(2)}
            type="radio"
            id="star2"
            name="rate"
            value="2"
          />
          <label htmlFor="star2" title="😔">
            2 stars
          </label>

          <input
            onClick={() => setRate(1)}
            type="radio"
            id="star1"
            name="rate"
            value="1"
          />
          <label htmlFor="star1" title="😞">
            1 star
          </label>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StarRate);
