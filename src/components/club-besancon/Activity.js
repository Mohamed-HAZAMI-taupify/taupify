import React from "react";
import ImageLoader from "../common-components/image-loader";
import { useMediaQuery } from "react-responsive";

const Activity = (props) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 800px)" });
  const el = props.el;
  return (
    <section className="home-component">
      <section className="activity-studio activity">
        {
          isSmallScreen ?
          <ImageLoader alt={el.name} src={el.imageSmallScreen} /> : 
          <ImageLoader alt={el.name} src={el.image} /> 
        }
        <div className="description des-act">
          <h2>{el.name} </h2>
          <p>{el.description}</p>
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
                <div className="submenu-images">
                  {element.images &&
                    element.images.map((image, index) => (
                      <img
                        rel="preload"
                        key={index}
                        className="submenu-image"
                        src={image.link}
                      ></img>
                    ))}
                </div>
                <div className="submenu-paragraphes">
                  {element.paragraphes &&
                    element.paragraphes.map((paragraphe, index) => (
                      <div
                        key={index}
                        className="col-6 col-md-6 submenu-paragraph"
                      >
                        <h3>{paragraphe.title}</h3>
                        <p>{paragraphe.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          <div style={{ height: "100px" }}></div>
        </div>
      </div>
    </section>
  );
};
export default Activity;