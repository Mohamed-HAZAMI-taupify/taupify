import React, { useEffect, useState } from "react";
import { useSelector , useDispatch} from "react-redux";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import ImageSkeleton from "../../common-components/image-loader/ImageSkeleton";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button, makeStyles } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import {
  LOAD_ACTIVITIES,
  LOAD_COACHES,
  LOAD_EVENT_PLANNING,
} from "../../graphQL/Queries";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@mui/material/Box";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { data } from "../../../data/routes/routesData";
import { getCoaches } from "../../../redux/actions/CoachesAction";



const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: "20px",
  },
});

const PlanningCardButton = ({ i, btnName, coach }) => (
  <Link to={`/reservation/${i}/${coach}`} className="link-btn-reserver">
    <button className="button-slider-coach-card">{btnName}</button>
  </Link>
);

const SliderCoachPlanningCard = ({ coach, name, date, heure, i, event }) => (
  <div className="trainer-card-caroussel-first-container" key={i}>
    <div className="trainer-card-caroussel-container">
      <div className="profile-card-slider text-center">
        <div className="profile-content">
          <p className="profile-card-p">{date}</p>
          <p className="profile-card-text">{name}</p>
          <Row>
            <Col sm={6}>
              <p className="profile-card-p">{heure}</p>
            </Col>
            <Col sm={6}>
              {(event.attendingLimit === event.bookedAttendees.length &&
                event.queuedAttendees.length === event.queueLimit) ||
              (event.queueLimit == null &&
                event.attendingLimit === event.bookedAttendees.length) ? (
                <div className="div-card-planning-coach-text">
                  <span className="span-card-coach">
                    LISTE D'ATTENTE COMPLÈTE{" "}
                  </span>
                </div>
              ) : event.attendingLimit === event.bookedAttendees.length &&
                event.queuedAttendees.length < event.queueLimit ? (
                <PlanningCardButton
                  i={event.id.replace(/^\D+/g, "")}
                  coach={event.coach.replace(/^\D+/g, "")}
                  btnName={
                    event.queueLimit
                      ? "Liste d'attente " +
                        "(" +
                        event.queuedAttendees.length +
                        "/" +
                        event.queueLimit +
                        ")"
                      : "Liste d'attente"
                  }
                />
              ) : (
                <PlanningCardButton
                  i={event.id.replace(/^\D+/g, "")}
                  coach={event.coach.replace(/^\D+/g, "")}
                  btnName={
                    "réserver" +
                    (event.bookedAttendees.length && event.attendingLimit
                      ? "(" +
                        event.bookedAttendees.length +
                        "/" +
                        event.attendingLimit +
                        ")"
                      : "")
                  }
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
);

const DATE_OPTIONS_PLANNING = {
  weekday: "long",
  month: "numeric",
  day: "numeric",
};
const TIME_OPTIONS_PLANNING = {
  hour: "2-digit",
  minute: "2-digit",
};

const transition = {
  duration: 0.4,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const backVariants = {
  exit: { x: 100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 0.4, ...transition } },
};

const beforVariants = {
  exit: { x: -100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 0.4, ...transition } },
};

const NewCoachSingleImage = (props) => {
  const [eventListGQL, setEventListGQL] = useState([]);
  const [coachList, setCoachList] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [urlCendly, setUrlCendly] = useState("");

  const dispatch = useDispatch();
  const coachesReducer = useSelector(state => state.CoachesReducer);
  useEffect(() => {
    dispatch(getCoaches());
  }, []);

  useEffect(() => {
    setUrlCendly(coachesReducer.Coaches.filter(item => item._id === props.match.params.id)[0] &&
                 coachesReducer.Coaches.filter(item => item._id === props.match.params.id)[0].calendly)

  }, [coachesReducer]);

  const threeColumns = [1, 2, 3];

  const { data: dataCoach } = useQuery(LOAD_COACHES);
  const { loading: loadingEvent, data: dataEvent } =
    useQuery(LOAD_EVENT_PLANNING);

  const { data: dataActivities } = useQuery(LOAD_ACTIVITIES);

  useEffect(() => {
    setTimeout(() => setIndex(coachsListIndexes.indexOf(id)), 1000);
    if (dataEvent) {
      setEventListGQL(dataEvent.events);
    }
    if (dataCoach) {
      setCoachList(dataCoach.coaches);
    }
    if (dataActivities) {
      setSportList(dataActivities.activities);
    }
  }, [dataEvent, dataCoach, dataActivities]);

  const classes = useStyles();
  const { id } = useParams();
  const { idResamania } = useParams();
  const coachsListIndexes = coachList.map((t) => t._id);
  const newCoachsListRes = coachList.map((t) =>
    t.id_resamania_prod
      ? t.id_resamania_prod.replace("/everestsportclubbesancon/coaches/", "")
      : t.id_resamania.replace("/everestsportclubbesancon/coaches/", "")
  );
  const [index, setIndex] = React.useState(
    newCoachsListRes.indexOf(idResamania)
  );

  const filtredEventListGQL = eventListGQL.filter((event) =>
    event.coach != null && !loadingEvent
      ? event.coach.replace("/everestsportclubbesancon/coaches/", "") ==
        props.match.params.idResamania
      : null
  );

  return (
    <div className="w-gridd no-gutterr">
      <Row className="row-coach-singl-image">
        <Col sm={6}>
          <motion.div
            className="single-coach-img motion-center"
            initial="exit"
            animate="enter"
            exit="exit"
          >
            <div className="trainer-item-container-single-image">
              <div className="item-container-cover-single-image">
                <ImageSkeleton
                  alt="Everest home page"
                  className="single-coach-img-img"
                  src={`${
                    coachList.map((coach) => coach.image._url)[
                      parseInt(props.match.params.k, 10)
                    ]
                  }`}
                />
              </div>
              <div className="social_media_container">
                <Row className="social-media-position">
                  <Col xs={3} className="social-media-text">
                    {
                      coachList.map((coach) =>
                        coach.socialmedia.youtube !== "" ? (
                          <a
                            href={`${coach.socialmedia.youtube}`}
                            target="_blank"
                          >
                            <YouTubeIcon className="social-media-icon-youtube" />
                          </a>
                        ) : null
                      )[newCoachsListRes.indexOf(idResamania)]
                    }
                  </Col>
                </Row>
              </div>

              <div className="trainer-item-container-cartouche-single-image">
                <Row className="trainer-item-container-cartouche-single-image-row">
                  <Col xs={3}>
                    <motion.div
                      className="beforrcoach"
                      variants={beforVariants}
                    >
                      {parseInt(props.match.params.k, 10) < 1 ? (
                        <Link
                          to={
                            data.coach_image +
                            `/${Number(coachList.length) - 1}/${
                              coachsListIndexes[coachList.length - 1]
                            }/${newCoachsListRes[coachList.length - 1]}`
                          }
                          className="next-iconn"
                        >
                          <NavigateBeforeIcon className="next-iconn" />
                        </Link>
                      ) : (
                        <Link
                          to={
                            data.coach_image +
                            `/${parseInt(props.match.params.k, 10) - 1}/${
                              coachsListIndexes[
                                coachsListIndexes.indexOf(id) - 1
                              ]
                            }/${
                              newCoachsListRes[
                                coachsListIndexes.indexOf(id) - 1
                              ]
                            }`
                          }
                          className="next-iconn"
                        >
                          <NavigateBeforeIcon className="next-iconn" />
                        </Link>
                      )}
                    </motion.div>
                  </Col>
                  <Col xs={3} className="col-next">
                    <motion.div className="nextcoach" variants={backVariants}>
                      {parseInt(props.match.params.k, 10) >
                      Number(coachList.length) - 2 ? (
                        <Link
                          to={
                            data.coach_image +
                            `/0/${coachsListIndexes[0]}/${newCoachsListRes[0]}`
                          }
                          className="next-iconn"
                        >
                          <NavigateNextIcon className="next-iconn" />
                        </Link>
                      ) : (
                        <Link
                          to={
                            data.coach_image +
                            `/${parseInt(props.match.params.k, 10) + 1}/${
                              coachsListIndexes[
                                coachsListIndexes.indexOf(id) + 1
                              ]
                            }/${
                              newCoachsListRes[
                                coachsListIndexes.indexOf(id) + 1
                              ]
                            }`
                          }
                          className="next-iconn"
                        >
                          <NavigateNextIcon className="next-iconn" />
                        </Link>
                      )}
                    </motion.div>
                  </Col>
                  <Col xs={6} className="navigation-link">
                    <Link
                      to={data.coaches}
                      className="navigation-link-no-decoration"
                    >
                      <span className="navigation-link-text">
                        TOUS LES TRAINERS
                      </span>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </motion.div>
        </Col>
        <Col sm={6}>
          <div className="trainer-infos-content-container">
            <div className="coach-info">
              {
                coachList.map((coach) => (
                  <h1 className="new-coach-title-xl title-xl-margin">
                    {coach.givenName}
                  </h1>
                ))[parseInt(props.match.params.k, 10)]
              }

              <ul className="coach-list-single">
                {
                  coachList.map((coach) => (
                    <li key={coach._id}>
                      {coach.activities.map((activity) => (
                        <div className="coach-activities">{activity.label}</div>
                      ))}
                    </li>
                  ))[parseInt(props.match.params.k, 10)]
                }
              </ul>

              <div className="position-coach">
                <img
                  src="https://i.ibb.co/dLdKbz6/position.png"
                  className="position-coach-icon"
                />
                <span>BESANCON</span>
              </div>
              <div className="text-regular-single">
                {
                  coachList.map((coach) => <span>{coach.description}</span>)[
                    parseInt(props.match.params.k, 10)
                  ]
                }
              </div>
              {/* <MusicPlayList /> */}
              <h3 className="audio-title">Coaching personnel</h3>
              {/* <Button
                  classes={{
                    root: classes.root, // class name, e.g. `classes-nesting-root-x`
                    label: classes.label, // class name, e.g. `classes-nesting-label-x`
                  }}
                  className="not-found-button"
                  onClick={() => props.toggle("InfoRdvCoachPopUp", true)}
                >
                  Prenez rendez-vous
                </Button> */}
              {/* <InfoRdvCoachPopUp /> */}

              {/* href={
                  data.rdv +
                  `-${
                    coachList.map((coach) =>
                      coach.alternateName == "vincent-maigner"
                        ? "vincent-marigner"
                        : coach.alternateName == "Mathieu-Grisier"
                        ? "grisier-mathieu"
                        : coach.givenName.toLowerCase()
                    )[parseInt(props.match.params.k, 10)]
                  }`
                } */}
                {
                  urlCendly &&
                  // <a href="/rendez-vous">
                  <Link to={{ pathname: "/rendez-vous", state: { urlCendly } }}>
                  <Button
                    classes={{
                      root: classes.root,
                      label: classes.label,
                    }}
                    className="not-found-button"
                  >
                    Prenez rendez-vous
                    {console.log("yyyy c" , urlCendly)}
                  </Button>
                  </Link>
                // </a>
                }

            </div>
          </div>
        </Col>
      </Row>

      {loadingEvent ? (
        <div className="session-coach">
          <div className="session-coach-title">
            <h1 className="title-session">
              SESSIONS À VENIR AVEC{" "}
              {
                coachList.map((coach) => coach.givenName)[
                  parseInt(props.match.params.k, 10)
                ]
              }
            </h1>
          </div>

          <Carousel responsive={responsive}>
            {threeColumns.map((col, index) => (
              <div
                className="trainer-card-caroussel-first-container"
                key={index}
              >
                <div className="trainer-card-caroussel-container">
                  <div className="profile-card-slider text-center">
                    <div className="profile-content">
                      <Box
                        sx={{ width: 50, height: 20 }}
                        className="box-skeleton-coach-events box-skeleton-coach-events-date-title"
                      >
                        <Skeleton className="skeleton-coach-events" />
                      </Box>
                      <Box
                        sx={{ width: 100, height: 30 }}
                        className="box-skeleton-coach-events box-skeleton-coach-events-date-title"
                      >
                        <Skeleton className="skeleton-coach-events" />
                      </Box>
                      <Row>
                        <Col sm={6}>
                          <Box
                            sx={{ width: 70, height: 20 }}
                            className="box-skeleton-coach-events box-skeleton-coach-events-startedTime"
                          >
                            <Skeleton className="skeleton-coach-events" />
                          </Box>
                        </Col>
                        <Col sm={6}>
                          <Box
                            sx={{ width: 100, height: 40 }}
                            className="box-skeleton-coach-events"
                          >
                            <Skeleton className="skeleton-coach-events" />
                          </Box>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      ) : null}

      {!loadingEvent > 0 ? (
        <div className="session-coach">
          {filtredEventListGQL.length > 0 ? (
            <div className="session-coach-title">
              <h1 className="title-session">
                SESSIONS À VENIR AVEC{" "}
                {
                  coachList.map((coach) => coach.givenName)[
                    parseInt(props.match.params.k, 10)
                  ]
                }
              </h1>
            </div>
          ) : null}

          <Carousel responsive={responsive}>
            {filtredEventListGQL.map((event, i) =>
              event.coach != null ? (
                <SliderCoachPlanningCard
                  event={event}
                  key={i}
                  i={i}
                  name={event.activityObject.name}
                  heure={
                    event.coach ==
                      coachList.map((coach) => coach.id_resamania_prod)[
                        parseInt(props.match.params.k, 10)
                      ] && event.startedAt
                      ? new Date(event.startedAt)
                          .toLocaleTimeString("fr", TIME_OPTIONS_PLANNING)
                          .split(":")
                          .join("H")
                      : null
                  }
                  date={
                    event.coach ==
                      coachList.map((coach) => coach.id_resamania_prod)[
                        parseInt(props.match.params.k, 10)
                      ] && event.startedAt
                      ? new Date(event.startedAt).toLocaleDateString(
                          "fr",
                          DATE_OPTIONS_PLANNING
                        )
                      : null
                  }
                />
              ) : null
            )}
          </Carousel>
        </div>
      ) : null}
    </div>
  );
};

export default connect(null, null)(NewCoachSingleImage);