import React, { useEffect } from "react";
import ImageLoader from "../common-components/image-loader";
import ExperienceAccordions from "./ExperienceAccordions";
import ExperienceFourthRow from "./ExperienceFourthRow";
import { data } from "../../data/routes/routesData";
const Experience = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="experience-containers">
      <section className="experience-intro">
        <div className="experience-intro-cover">
          <ImageLoader
            className="experience-header-img"
            src="https://i.ibb.co/1nNZMXH/montassar2.jpg"
          />
          <span
            className="gr-1"
            style={{
              transform:
                "matrix(0.731354, -0.681998, 0.681998, 0.731354, 0, 75)",
            }}
          ></span>
          <span
            className="gr-2"
            style={{
              transform:
                "matrix(0.731354, -0.681998, 0.681998, 0.731354, 0, 75)",
            }}
          ></span>
        </div>

        <div className="experience-intro-content">
          <div className="experience-intro-content-container">
            <h1 className="experience-title-xl text-left-experience little-margin ">
              À VOUS DE CRÉER L’EVEREST QUI VOUS RESSEMBLE !
            </h1>
            <p className="text-emphasis">
              Nous nous sommes inspirés des programmes de préparation physique
              des athlètes pour vous procurer un entraînement de haut niveau,
              vous garantissant un développement durable et remarquable de vos
              qualités physiques.
            </p>

            <div className="experience-text-regular">
              Everest choisit pour vous des sports complémentaires et efficaces,
              des coachs expérimentés, les meilleurs de la région, qui vous
              accompagneront pour vous aider à concrétiser plus rapidement tous
              vos objectifs ! À vous de sélectionner le mix sportif qui vous
              convient !
            </div>
          </div>
        </div>
      </section>

      <section className="experience-studios-exception">
        <ExperienceAccordions />
      </section>

      <section className="experience-third-row img-div ">
        <div className="experience-third-grid">
          <h2 className="experience-third-text">
            Parce qu’un programme sportif intensif et varié vous garantit le
            succès, franchissez le pas, associez les sports et combinez leurs
            bienfaits ! Petit à petit, vous allez voir des merveilles!
          </h2>
        </div>
      </section>

      <section className="experience-fourth-row medium-margin">
        <ExperienceFourthRow />
      </section>

      <section className="experience-third-row">
        <div className="experience-forth-grid">
          <h3 className="experience-title-xl text-left-experience text-center-experience">
            À LA PROCHAINE SESSION À EVEREST
          </h3>
        </div>
      </section>

      <section className="explore-planning content">
        <div className="w_grid no-gutter">
          <div className="grid-col col_size-12">
            <h3 className="text-fit">Planning Everest</h3>{" "}
            <a
              id="on_show_planning"
              href={data.planning}
              className="button button-loader explore-planning-btn"
            >
              voir tout le planning
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
