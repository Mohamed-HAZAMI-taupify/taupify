import React from "react";
import bottomDirection from "../../../assets/bottomDirection.png";
import ImageLoader from "../image-loader";

export default function SectionPreinscription({ backgroundImg }) {
  return (
    <section className="first-section">
      <ImageLoader
        alt="rejoignez nous"
        className="rejoignez-nous-image"
        src={backgroundImg}
      />

      <h1 className="title-journal-text">
        Consultez Nos Articles Et Suivez Toutes Les Actualités !
      </h1>

      <a href="#jump">
        <img
          alt="bottom direction"
          className="bottom-direction get-down"
          src={bottomDirection}
        ></img>
      </a>
    </section>
  );
}