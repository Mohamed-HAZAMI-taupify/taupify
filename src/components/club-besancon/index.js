import React, { useEffect, useState } from "react";
import bottomDirection from "../../assets/bottomDirection.png";
import { Link } from "react-router-dom";
import everestbesanconTitle from "../../assets/everest-besancon-title.png";
import { activtiesInfo } from "../../data/besanconData";
import Activity from "./Activity";
import ImageLoader from "../common-components/image-loader";
import { connect } from "react-redux";
import { toggle } from "../../redux/actions/AdminActions";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col, Row } from "reactstrap";
import { data } from "../../data/routes/routesData";
import { useMediaQuery } from "react-responsive";
const ClubBesancon = (props) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 800px)" });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [loaded, setLoaded] = useState(false);

  return (
    <main>
      <section className="first-section">
        <iframe
          className="video-section desktop"
          frameBorder="0"
          allowFullScreen
          src="https://www.youtube.com/embed/hhYhHOxcUX4?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=hhYhHOxcUX4"
        ></iframe>
        <iframe
          src="https://player.vimeo.com/video/647259205?h=45abb4e8c9title=0&amp;sidedock=0&amp;byline=0&amp;portrait=0&amp;sidedock=0&amp;controls=0&amp;autoplay=1&amp;loop=1&amp;autopause=0&amp;muted=1&amp;player_id=0"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="montage Everest"
          className="video-section-mobile"
          style={loaded ? {} : { display: "none" }}
          onLoad={() => setLoaded(true)}
        ></iframe>

        <div className="title-img-div">
          <img
            alt="Everest title"
            className="title"
            src={everestbesanconTitle}
          ></img>
        </div>
        <>
          <Link
            className="link title-pre-inscription-btn"
            to={data.rejoignez_nous}
          >
            <button className="btn-ev btn-m">Pré-inscription</button>
          </Link>
          <a href="#0">
            <img
              alt="bottom direction"
              className="bottom-direction"
              src={bottomDirection}
            ></img>
          </a>
        </>
      </section>
      <section className="besancon-info">
        <div id="0" className="top-part">
          <div>
            <h4>CONTACT</h4>
            <h6>4 rue de l'Escale</h6>
            <h6>25000 Besancon</h6>
            <h6>+33 03 81 51 89 85</h6>
          </div>
          <div className="time">
            <h4>HORAIRES</h4>
            <h6>Lundi - Vendredi : 08:00 - 21:00</h6>
            <h6>Samedi - Dimanche : 09:00 - 16:00</h6>
            <h6> Accès Libre </h6>
            <h6>Lundi - Vendredi : 06:00-23:00</h6>
            <h6>Samedi - Dimanche : 06:00-21:00</h6>
          </div>
          <div>
            <h4>SERVICES</h4>
            <h6>
              Piscine de 13m, Cardio, Musculation, Espace HIIT, Spa, Sauna {"&"}
              Hammam, Cours collectifs...
            </h6>
            <h6>Studios : Boxing, Cycling, Combat, Athlétic {"&"} Yoga</h6>
          </div>
        </div>
        <div className="description bottom-part">
          <p>
            Situé au cœur de Temis, Everest est un club de sport et de bien-être
            d'exception sur plus de 2500 m². Il dispose d’espace cardio training
            et musculation équipés par du matériel connecté, dernière génération
            de la célèbre marque Technogym, un studio bike immersif, une zone
            d'entraînement haute intensité, un studio yoga, une salle d'
            électrostimulation, une piscine de 13m, un spa avec saunas hammam,
            une zone dédiée au coworking et un espace où vous pourrez vous
            restaurer sainement. Les meilleurs coachs de la région vous font
            découvrir une vaste gamme de cours Lesmills dans des studios avec
            une conception d'éclairage et de sonorisation interactif sur-mesure.
            Réservez votre expérience aujourd'hui pour découvrir le club par
            vous-même.
          </p>
        </div>
      </section>
      {activtiesInfo.map((el, index) =>
        el.link ? (
          <a key={index} href={`${el.link}`} target="_blank" >
            <Activity el={el} activityIndex={index} />
          </a>
        ) : (
          <Activity el={el} key={index} activityIndex={index} />
        )
      )}

      <section className="coaching-personnel">
      {
          isSmallScreen ?
          <ImageLoader alt=" COACHING PERSONNEL background"
                       className="background-image"
                       src="https://i.ibb.co/cwN3zc8/coaching-personnels1.png" /> : 
          <ImageLoader alt=" COACHING PERSONNEL background"
                       className="background-image"
                       src="https://i.ibb.co/vHwT07X/coaching-personnels.png" />
      }

        <div className="description">
          <h3>COACHING PERSONNEL</h3>
          <p>
            Vous avez des objectifs. Personnalisez votre programme et obtenez
            des résultats rapidement avec nos coachs experts
          </p>
        </div>
      </section>
      <section className="nutrition">

      {
          isSmallScreen ?
          <ImageLoader alt="FITNESS FOOD background"
                       className="background-image"
                       src="https://i.ibb.co/XVhrCf2/fit-food2.jpg" /> : 
          <ImageLoader alt="FITNESS FOOD background"
                       className="background-image"
                       src="https://i.ibb.co/DtDsVfd/fit-food1.jpg" />
      }

        <div className="description">
          <h3>FITNESS FOOD</h3>
          <p>
            Créé par des nutritionnistes, fabriqué par des chefs. Des aliments
            délicieux et naturels pour satisfaire tous les objectifs du fitness
          </p>
        </div>
      </section>
      <section className="last-section">
      {
          isSmallScreen ?
          <ImageLoader alt="NOS ACTIVITIES background"
                       className="background-image"
                       src="https://i.ibb.co/ZYHR0jW/nos-activites2.jpg" /> : 
          <ImageLoader alt="NOS ACTIVITIES background"
                       className="background-image"
                       src="https://i.ibb.co/vwGggw0/nos-activites1.jpg" />
      }
        <div className="description bes-desc">
          <h3>NOS ACTIVITIÉS</h3>
          <p>
            Nous proposons une vaste gamme de cours avec les meilleurs coachs de
            la région. Vivez une expérience à chaque entraînement.
          </p>
          <Link to={data.studios}>
            <button className=" btn-ev btn-m hvr-info uppercase">
              Découvrir
            </button>
          </Link>
        </div>
      </section>

      <section className=" mobile-section-download-sec myEverest-section">
        <div className="mobile-container-download">
          <h1>
            téléchargez <br />
            l'app
          </h1>
          <p>
            Avec l'app MyEverest, réservez vos cours collectifs et assistez à
            certaines séances d'entraînement depuis votre mobile.
          </p>
          <h3>téléchargez l'app maintenant</h3>
          <div>
            <a
              href="https://play.google.com/store/apps/details?id=com.technogym.mywellness.everest"
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture>
              <img
                src={"https://i.ibb.co/9hrFzXL/GP-3x.png"}
                className="google-play-btn"
              />
              </picture>
            </a>
          </div>
          <div>
            <a
              href="https://apps.apple.com/us/app/my-everest/id1537375206?itsct=apps_box_link&itscg=30200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <picture>
              <img
                src={"https://i.ibb.co/g7PzQGD/App-store-3x.png"}
                className="app-store-btn"
              />
              </picture>
            </a>
          </div>
        </div>
      </section>

      <section className="last-section mobile-section-download desktop-section-download">
        <Row className="row-mobile-download-section">
          <Col sm={1}></Col>
          <Col sm={5}>
            <ImageLoader
              src="https://i.ibb.co/YB7JH6y/phone-1.png"
              className="img-download-apps image-myEverest"
            />
          </Col>

          <Col sm={5}>
            <div className="second-row-mobile-download">
              <div className="second-row-container">
                <h1>téléchargez l'app</h1>
                <p>
                  Avec l'app MyEverest, réservez vos cours collectifs et
                  assistez à certaines séances d'entraînement depuis votre
                  mobile.
                </p>
                <h3>téléchargez l'app maintenant</h3>
                <div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.technogym.mywellness.everest"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <picture>
                    <img
                      src={"https://i.ibb.co/9hrFzXL/GP-3x.png"}
                      className="google-play-btn"
                    />
                    </picture>
                  </a>
                </div>
                <div>
                  <a
                    href="https://apps.apple.com/us/app/my-everest/id1537375206?itsct=apps_box_link&itscg=30200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <picture>
                    <img
                      src={"https://i.ibb.co/g7PzQGD/App-store-3x.png"}
                      className="app-store-btn"
                    />
                    </picture>
                  </a>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={1}></Col>
        </Row>
      </section>
    </main>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});

export default connect(null, mapDispatchToProps)(ClubBesancon);