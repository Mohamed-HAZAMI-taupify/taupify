import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getQuestions } from "../../../../redux/actions/customer-feedback/QuestionAction";
import Accordion from "./Accordion";
import { Bar } from "react-chartjs-2";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getFeedbackForm } from "../../../../redux/actions/customer-feedback/FeedbackFormAction";
const FeedBackFormReport = (props) => {
  const { questionsList } = props.questionReducer;
  const { feedBackFormList } = props.feedbackFormReducer;

  const [dataSet, setDataSet] = useState([]);
  const [label, setLabel] = useState([]);

  useEffect(() => {
    props.getQuestions();
    props.getFeedbackForm();
  }, []);

  useEffect(() => {
    if (questionsList) {
      let rateOccurence = questionsList.map((e) => {
        let occurenceObject = e.answers
          .map((el) => el.rate)
          .reduce((acc, curr) => ((acc[curr] = (acc[curr] || 0) + 1), acc), {});
        for (let i = 1; i <= e.outOf; i++) {
          if (!occurenceObject[i]) {
            occurenceObject[i] = 0;
          }
        }
        return occurenceObject;
      });
      setDataSet(rateOccurence);
    }
  }, [questionsList]);

  useEffect(() => {
    if (dataSet) {
      setLabel([
        { key: "emoji", value: ["😠", "🙁", "😐", "🙂​", "😄"] },
        {
          key: "numbers",
          value: ["➀", "➁", "➂", "➃​", "➄", "➅", "➆", "➇", "➈", "➉"],
        },
        { key: "stars", value: ["★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"] },
        { key: "oui ou non", value: ["Non", "Oui"] },
      ]);
    }
  }, [dataSet]);

  return (
    <>
      <section className="feedback-form">
        <div className="feedback-count">
          {feedBackFormList.length}
          <span> Formulaires ont été soumis</span>
        </div>
        {feedBackFormList.filter((e) => e.message !== "") && (
          <div className="feedback-count">
            {feedBackFormList.filter((e) => e.message !== "").length}
            <span>Messages ont été envoyés</span>
          </div>
        )}

        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024,
              },
              items: 3,
              partialVisibilityGutter: 40,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
              partialVisibilityGutter: 30,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 2,
              partialVisibilityGutter: 30,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {feedBackFormList &&
            feedBackFormList.map((e) =>
              e.message ? <div className="message-card">{e.message}</div> : null
            )}
        </Carousel>
      </section>
      {questionsList &&
        questionsList.map((e, index) => (
          <Accordion
            title={e.subject}
            content={
              <Bar
                data={{
                  labels:
                    label.find((lab) => lab.key === e.type) &&
                    label.find((lab) => lab.key === e.type).value,
                  datasets: [
                    {
                      data: dataSet[index] && Object.values(dataSet[index]),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(255, 159, 64, 0.6)",
                        "rgba(64, 210, 255, 0.6)",
                        "rgba(93, 64, 255, 0.6)",
                        "rgba(255, 182, 64, 0.6)",
                        "rgba(64, 255, 144, 0.6)",
                      ],
                    },
                  ],
                }}
                options={{
                  title: {
                    display: true,
                    text:
                      e.answers.length +
                      " perosonnes ont répondu à cette question",
                    fontSize: 25,
                  },
                  legend: {
                    display: false,
                    position: "bottom",
                    labels: {
                      fontColor: "#000",
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        ticks: {
                          max: e.outOf,
                        },
                        barThickness: 73,
                      },
                    ],
                    yAxes: [
                      {
                        ticks: {
                          min: 0,
                        },
                      },
                    ],
                  },
                }}
              />
            }
          />
        ))}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => {
    dispatch(getQuestions());
  },
  getFeedbackForm: () => {
    dispatch(getFeedbackForm());
  },
});
const mapStateToProps = (state) => {
  return {
    questionReducer: state.QuestionReducer,
    feedbackFormReducer: state.FeedbackFormReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackFormReport);
