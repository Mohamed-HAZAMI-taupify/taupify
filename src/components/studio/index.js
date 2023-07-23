import React, { useEffect } from "react";
import bottomDirection from "../../assets/bottomDirection.png";
import rightArrow from "../../assets/right-arrow.png";
import leftArrow from "../../assets/left-arrow.png";
import { activitiesSlideData } from "../../data/studioData";
import { studiosData } from "../../data/studioData";
import Studio from "./Studio";
import Slider from "./Slider";
import ImageLoader from "../common-components/image-loader";

const Studios = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="first-section-studio">
        <img
          alt="Everest Studio page"
          src="https://i.ibb.co/nzp1JP4/2.jpg"
          className="img-studio-phone"
        />
        <ImageLoader
          alt="Everest Studio page"
          src="https://i.ibb.co/k9cDVPP/first-photo-3.jpg"
          className="img-studio"
        />
        <div className="title">
          <h2>Sois plus fort que tes excuses.</h2>
        </div>{" "}
        <a href="#test">
          <img
            alt="bottom direction"
            className="bottom-direction"
            src={bottomDirection}
          ></img>
        </a>
      </section>
      <section id="test" className="activities-slide">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          {/* <!-- Indicators --> */}
          <ul className="carousel-indicators">
            {activitiesSlideData.map((el, index) => (
              <li
                key={index}
                data-target="#myCarousel"
                data-slide-to={index}
                className={el.indicatorClassName}
              ></li>
            ))}
          </ul>

          {/* <!-- The slideshow --> */}
          <div className="carousel-inner">
            {activitiesSlideData.map((el, index) => (
              <div key={index} className={el.className}>
                <ImageLoader
                  alt={el.name + " background"}
                  className="pic"
                  src={el.image}
                />

                <div className="carousel-caption">
                  <h2>{el.title}</h2>
                  <p>{el.description}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            className="carousel-control-prev"
            href="#myCarousel"
            data-slide="prev"
          >
            <img alt="flesh gauche" src={leftArrow}></img>
          </a>
          <a
            className="carousel-control-next"
            href="#myCarousel"
            data-slide="next"
          >
            <img alt="flesh droite" src={rightArrow}></img>
          </a>
        </div>
      </section>

      {studiosData.map((el, studioId) => (
        <Studio key={studioId} el={el} studioId={studioId} />
      ))}
      <Slider />
    </>
  );
};

export default Studios;
