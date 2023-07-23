import React, { useState } from "react";
import bottomDirection from "../../assets/bottomDirection.png";
import ImageLoader from "../common-components/image-loader";
const Studio = (props) => {
  const [btnStudioState, setBtnStudioState] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const el = props.el;
  const studioId = props.studioId;

  return (
    <section className="studio-component">
      <section className="activity-studio">
        <ImageLoader alt={el.name} src={el.image} />
        <div className="description des-act">
          <h2>{el.name} </h2>
          <div className="links">
            <div
              data-toggle="collapse"
              data-target={el.dataTarget}
              className={btnStudioState[studioId] ? "link" : "hidden"}
              onClick={() => {
                setBtnStudioState(
                  btnStudioState.map((el, index) =>
                    index === studioId ? !el : el
                  )
                );
              }}
            >
              <img
                alt="bottom direction"
                className={
                  btnStudioState[studioId]
                    ? "direction-btn top"
                    : "direction-btn"
                }
                src={bottomDirection}
              ></img>
            </div>
            <div
              data-toggle="collapse"
              data-target={el.dataTarget}
              className={!btnStudioState[studioId] ? "link" : "hidden"}
              onClick={() => {
                setBtnStudioState(
                  btnStudioState.map((el, index) =>
                    index === studioId ? !el : el
                  )
                );
              }}
            >
              <span>Explore</span>
              <img
                alt="bottom direction"
                className={
                  btnStudioState[studioId]
                    ? "direction-btn  top"
                    : "direction-btn"
                }
                src={bottomDirection}
              ></img>
            </div>
          </div>
        </div>
      </section>
      <div
        id={el.collapseElement}
        className="collapse"
        style={{ color: "white" }}
      >
        <div className="container">
          <div style={{ height: "100px" }}></div>
          {el.subMenu &&
            el.subMenu.map((element, index) => (
              <div key={index} className="row accordion__columns">
                <h2 className="col-6 col-md-6">{element.title}</h2>
                <h4 className="col-6 col-md-6">{element.description}</h4>
              </div>
            ))}
          <div style={{ height: "100px" }}></div>
        </div>
      </div>
    </section>
  );
};

export default Studio;
