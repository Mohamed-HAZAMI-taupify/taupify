import React, { useEffect } from "react";
import { locationOurClubData } from "../../data/LocationOurClubData";
import ImageLoader from "../common-components/image-loader";
import LocationOurClubActivity from "../common-components/location-our-club-activity";
import { useMediaQuery } from "react-responsive";
import { data } from "../../data/routes/routesData";
const LocationOurClub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width: 1224px)",
  });

  return (
    <>
      <section className="first-section-location-our-club">
        {isDesktop && (
          <ImageLoader
            alt="location our club"
            className="location-our-club-image"
            src="https://i.ibb.co/Sx35bdk/Whats-App-Image-2022-02-17-at-09-53-01.png"
          />
        )}

        {isMobile && (
          <ImageLoader
            alt="location our club"
            className="location-our-club-image"
            src="https://i.ibb.co/4gbpzyJ/123.png"
          />
        )}

        <h1 className="location-our-club-title weight-black">
          DES SOLUTIONS POUR TOUS VOS ÉVÉNEMENTS
        </h1>
        <p className="location-our-club-description">
          Nous mettons à votre profit nos infrastructures et notre expertise à
          travers nos offres de location de salles pour toutes vos fêtes,
          anniversaires et tout autre type d’évènement et activité.
        </p>
        <button className="location-our-club-button btn-m ">
          <a
            href={data.rejoignez_nous}
            className="weight-semi-bold location-link"
          >
            CONTACTEZ-NOUS
          </a>
        </button>
      </section>
      {locationOurClubData.map((el, index) => (
        <LocationOurClubActivity el={el} key={index} />
      ))}
    </>
  );
};

export default LocationOurClub;
