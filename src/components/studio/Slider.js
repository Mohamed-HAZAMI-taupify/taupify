import React, { useState } from "react";
import InfiniteCarousel from "react-leaf-carousel";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOAD_ACTIVITIES, LOAD_COACHES } from "../graphQL/Queries";

const SliderCoachCard = ({ coach, name, image, i, id_resamania, k }) => (
  <Link
    to={`/tm/coach-image/${k}/${i}/${id_resamania.replace(
      "/everestsportclubbesancon/coaches/",
      ""
    )}`}
    className="trainer-item-container"
    key={i}
  >
    <div className="profile-card-5 text-center">
      <img src={image} className="img img-responsive" />
      <div className="profile-content">
        <div className="profile-name">{name}</div>
        <ul className="coach-list profile-description">
          {coach.activities.map((e, i) => (
            <li key={i}>{e.label}</li>
          ))}
        </ul>
      </div>
    </div>
  </Link>
);

const Slider = () => {
  const [coachList, setCoachList] = useState([]);

  const { data: dataActivities } = useQuery(LOAD_ACTIVITIES);

  const { data: dataCoach } = useQuery(LOAD_COACHES);

  React.useEffect(() => {
    if (dataCoach) {
      setCoachList(dataCoach.coaches);
    }
  }, [dataCoach, dataActivities]);

  return (
    <section className="coach-slider">
      <div className="title">
        <h2>LES TRAINERS</h2>
      </div>

      {coachList.length > 0 ? (
        <section>
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 700,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 988,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1300,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
            ]}
            dots={false}
            showSides={true}
            sidesOpacity={1}
            sideSize={0.2}
            slidesToScroll={1}
            slidesToShow={4}
            scrollOnDevice={true}
          >
            {coachList &&
              coachList.map((coach, index) => (
                <SliderCoachCard
                  k={index}
                  key={coach._id}
                  coach={coach}
                  name={coach.givenName}
                  image={coach.image._url}
                  i={coach._id}
                  id_resamania={coach.id_resamania_prod ? coach.id_resamania_prod : coach.id_resamania }
                />
              ))}
          </InfiniteCarousel>
        </section>
      ) : null}
    </section>
  );
};

export default Slider;