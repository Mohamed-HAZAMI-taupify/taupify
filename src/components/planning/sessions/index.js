import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SearchBarFilter from "../filter";
import { days, times } from "../../../data/weekAndTime";
import { Row, Col, Button } from "reactstrap";
import WhiteSpinnerLoading from "../../common-components/spinner-loanding/WhiteSpinnerLoading";
import ReservationButton from "./reservation-btn";
import TooltipEv from "../../common-components/Tooltip/tooltipWithImage";
import {
  LOAD_ACTIVITIES,
  LOAD_CLUBS,
  LOAD_COACHES,
  LOAD_EVENTS_FILTER,
  LOAD_STUDIOS,
} from "../../graphQL/Queries";
import { useQuery } from "@apollo/client";

const CoachCardNull = () => {
  return <div></div>;
};

const PlanningList = (props) => {
  const DATE_OPTIONS_PLANNING = {
    weekday: "long",
    month: "numeric",
    day: "numeric",
  };

  const TIME_OPTIONS_PLANNING = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const { isAuthenticated } = props.authReducer;
  const { contactData } = props.membersReducer;

  const [sportValue, setSportValue] = useState(null);
  const [clubValue, setClub] = useState(null);
  const [coachValue, setCcoach] = useState(null);
  const [studioValue, setStudio] = useState(null);
  const [DayValue, setDay] = useState(null);
  const [timeValue, setTime] = useState(null);

  const [filtredEventListGQ, setFiltredEventListGQL] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [clubList, setClubList] = useState([]);
  const [studioList, setStudioList] = useState([]);
  const [coachList, setCoachList] = useState([]);

  const [searchActivity, setSearchActivity] = useState(null);
  const [searchByCoach, setSearchByCoach] = useState(null);
  const [searchByClub, setSearchByClub] = useState(null);
  const [searchByStudio, setSearchByStudio] = useState(null);
  const [searchByDay, setSearchByDay] = useState(null);
  const [searchByPeriod, setSearchByPeriod] = useState(null);

  const { loading: loading, data: dataSearchEvent } = useQuery(
    LOAD_EVENTS_FILTER,
    {
      variables: {
        filter: {
          activity_contains: searchActivity,
          coach_contains: searchByCoach,
          club_contains: searchByClub,
          studio_contains: searchByStudio,
          day_contains: searchByDay,
          time_contains: searchByPeriod,
        },
      },
    }
  );

  const { loading: loadingActivities, data: dataActivities } =
    useQuery(LOAD_ACTIVITIES);

  const { loading: loadingClub, data: dataClub } = useQuery(LOAD_CLUBS);

  const { loading: loadingStudio, data: dataStudio } = useQuery(LOAD_STUDIOS);

  const { loading: loadingCoach, data: dataCoach } = useQuery(LOAD_COACHES);

  useEffect(() => {
    if (dataSearchEvent) {
      setFiltredEventListGQL(dataSearchEvent.getfiltredEvents);
    }
    if (dataActivities) {
      setSportList(dataActivities.activities);
    }
    if (dataClub) {
      setClubList(dataClub.clubs);
    }
    if (dataStudio) {
      setStudioList(dataStudio.studios);
    }
    if (dataCoach) {
      setCoachList(dataCoach.coaches);
    }
  }, [dataSearchEvent, dataActivities, dataClub, dataStudio, dataCoach]);

  function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60);
  }

  return (
    <>
      <div className="w_grid_filter limited-content ">
        <Row>
          <Col sm={4}>
            <SearchBarFilter
              value={sportValue}
              placeholder="Sports"
              options={
                !loadingActivities
                  ? sportList.map((e) => ({
                      label: e.name,
                      value: e.id,
                    }))
                  : null
              }
              onChange={(event) => {
                event !== null ? setSportValue(event) : setSportValue(null);
                event !== null
                  ? setSearchActivity(event.map((t) => t.value))
                  : setSearchActivity(null);
              }}
              isMulti={true}
              isLoading={loadingActivities}
            />
          </Col>
          <Col sm={4}>
            <SearchBarFilter
              value={coachValue}
              placeholder="Trainers"
              options={
                !loadingCoach &&
                coachList.map((e) => ({
                  label: e.givenName,
                  value: e.id_resamania_prod,
                }))
              }
              onChange={(event) => {
                event !== null ? setCcoach(event) : setCcoach(null);
                event !== null
                  ? setSearchByCoach(event.map((t) => t.value))
                  : setSearchByCoach(null);
              }}
              isMulti={true}
              isLoading={loadingCoach}
            />
          </Col>
          <Col sm={4}>
            <SearchBarFilter
              value={studioValue}
              placeholder="studio"
              options={
                !loadingStudio
                  ? studioList.map((e) => ({
                      label: e.name,
                      value: e.id,
                    }))
                  : ""
              }
              onChange={(event) => {
                event !== null ? setStudio(event) : setStudio(null);
                event !== null
                  ? setSearchByStudio(event.map((t) => t.value))
                  : setSearchByStudio(null);
              }}
              isMulti={true}
              isLoading={loadingStudio}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <SearchBarFilter
              value={DayValue}
              placeholder="Jours"
              options={days.map((e) => ({
                label: e.label,
                value: e.value,
              }))}
              onChange={(event) => {
                event !== null ? setDay(event) : setDay(null);
                event !== null
                  ? setSearchByDay(event.map((t) => t.value))
                  : setSearchByDay(null);
              }}
              isMulti={true}
            />
          </Col>
          <Col sm={4}>
            <SearchBarFilter
              value={timeValue}
              placeholder="Période"
              options={times.map((e) => ({
                label: e.label,
                value: e.value,
              }))}
              onChange={(event) => {
                event !== null ? setTime(event) : setTime(null);
                event !== null
                  ? setSearchByPeriod(event.map((t) => t.value)[0])
                  : setSearchByPeriod(null);
              }}
              isMulti={true}
            />
          </Col>
          <Col sm={4}>
            <SearchBarFilter
              value={clubValue}
              placeholder="Clubs"
              options={
                !loadingClub
                  ? clubList.map((e) => ({
                      label: e.name,
                      value: e.id,
                    }))
                  : ""
              }
              onChange={(e) => {
                e !== null ? setClub(e) : setClub(null);
                e !== null
                  ? setSearchByClub(e.map((t) => t.value))
                  : setSearchByClub(null);
              }}
              isMulti={true}
              isLoading={loadingClub}
            />
          </Col>
        </Row>
      </div>
      <div className=" w_grid limited-content planning-container">
        {filtredEventListGQ
          ? filtredEventListGQ.map((event, index) => (
              <ul id="container_planning" key={event.id}>
                <li
                  className="planning-item grid-col col_size-12 is-pointer status-reserver"
                  data-jour={event.startedAt ? event.startedAt : null}
                  data-sport={
                    event.activityObject ? event.activityObject.name : null
                  }
                  data-coach={
                    event.coachObject ? event.coachObject.givenName : null
                  }
                  data-hub="everest-hub"
                  data-creneau={
                    event.startedAt ? event.startedAt.split("T")[1] : null
                  }
                  data-studio={
                    event.studioObject ? event.studioObject.name : null
                  }
                  key={index}
                >
                  <div
                    className="planning-item__container thm-after-athletic"
                    id="changing-item"
                  >
                    <div className="planning-cell planning-date">
                      <h3 className="title-m masterclass-txt-planning">
                        {event.startedAt
                          ? new Date(event.startedAt).toLocaleDateString(
                              "fr",
                              DATE_OPTIONS_PLANNING
                            )
                          : "--"}
                      </h3>
                    </div>
                    <div className="planning-cell planning-time">
                      {" "}
                      <time className="masterclass-txt-planning title-sm">
                        {event.startedAt
                          ? new Date(event.startedAt)
                              .toLocaleTimeString("fr", TIME_OPTIONS_PLANNING)
                              .split(":")
                              .join("H")
                          : "--"}
                      </time>{" "}
                      <span className="duration masterclass-txt-planning">
                        {event.startedAt && event.endedAt
                          ? getDifferenceInMinutes(
                              new Date(event.endedAt),
                              new Date(event.startedAt)
                            ) + " min"
                          : "--"}
                      </span>
                    </div>
                    <div className="planning-cell planning-studio">
                      <div className="con-tooltip left">
                        <h2
                          className="title-m masterclass-txt-planning tooltip-helper"
                          data-type="sport"
                          data-id="927325"
                        >
                          <span
                            className="tooltip-container activity-span-events weight-semi-bold"
                            href="#"
                            id="UncontrolledTooltipExample"
                          >
                            {event.activityObject
                              ? event.activityObject.name
                              : null}
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="planning-cell planning-coach">
                      <div className="tooltip-wrapper tooltip-wrapper-planning">
                        <div className="con-tooltip right">
                          {event.coach ===
                          "/everestsportclubbesancon/coaches/5357" ? (
                            <CoachCardNull />
                          ) : event.coach ===
                            "/everestsportclubbesancon/coaches/5358" ? (
                            <CoachCardNull />
                          ) : event.coach ===
                            "/everestsportclubbesancon/coaches/5359" ? (
                            <CoachCardNull />
                          ) : event.coach ===
                            "/everestsportclubbesancon/coaches/6511" ? (
                            <TooltipEv
                              key={index}
                              image={"https://i.ibb.co/GHCw38g/unnamed22.png"}
                              name={"Mathias"}
                              description={"--"}
                            />
                          ) : event.coach ===
                            "/everestsportclubbesancon/coaches/5352" ? (
                            <TooltipEv
                              key={index}
                              image={"https://i.ibb.co/GHCw38g/unnamed22.png"}
                              name={"Claire"}
                              description={"--"}
                            />
                          ) : event.coach ===
                            "/everestsportclubbesancon/coaches/5351" ? (
                            <TooltipEv
                              key={index}
                              image={"https://i.ibb.co/GHCw38g/unnamed22.png"}
                              name={"Celia"}
                              description={"--"}
                            />
                          ) : event.coach ===
                            "/everestsportclubbesancon/coaches/5350" ? (
                            <TooltipEv
                              key={index}
                              image={"https://i.ibb.co/GHCw38g/unnamed22.png"}
                              name={"Chloé"}
                              description={"--"}
                            />
                          ) : event.coachObject ? (
                            <TooltipEv
                              key={index}
                              image={
                                event.coachObject.image
                                  ? event.coachObject.image._url
                                  : "https://i.ibb.co/GHCw38g/unnamed22.png"
                              }
                              name={
                                event.coachObject.givenName
                                  ? event.coachObject.givenName
                                  : "--"
                              }
                              description={
                                event.coachObject.description
                                  ? event.coachObject.description
                                  : "--"
                              }
                              linkTo={`/coach-image/${coachList
                                .map((k) => k.id_resamania_prod)
                                .indexOf(
                                  event.coachObject.id_resamania_prod
                                )}/${
                                event.coachObject._id
                              }/${event.coachObject.id_resamania_prod.replace(
                                "/everestsportclubbesancon/coaches/",
                                ""
                              )}`}
                            />
                          ) : null}
                          <h4
                            className="masterclass-txt-planning tooltip-helper title-sm"
                            data-type="coach"
                            data-id="43073"
                          >
                            {event.coachObject
                              ? event.coachObject.givenName
                              : event.coach ===
                                "/everestsportclubbesancon/coaches/6511"
                              ? "Mathias"
                              : event.coach ===
                                "/everestsportclubbesancon/coaches/10929"
                              ? "Eleonore et Mathias"
                              : event.coach ===
                                "/everestsportclubbesancon/coaches/10873"
                              ? "Joséphine / Eléonore"
                              : null}
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="planning-cell planning-address">
                      {" "}
                      <address
                        className="masterclass-txt-planning tooltip-helper"
                        data-type="hub"
                        data-id="927314"
                      >
                        {event.studioObject ? event.studioObject.name : null}
                      </address>
                    </div>

                    {(event.attendingLimit === event.bookedAttendees.length &&
                      event.queuedAttendees.length === event.queueLimit) ||
                    (event.queueLimit === null &&
                      event.attendingLimit === event.bookedAttendees.length) ? (
                      <div className="planning-cell planning-cta ">
                        <span className="span-complet">
                          LISTE D'ATTENTE COMPLÈTE{" "}
                        </span>
                      </div>
                    ) : event.attendingLimit === event.bookedAttendees.length &&
                      event.queuedAttendees.length < event.queueLimit ? (
                      <ReservationButton
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
                    ) : isAuthenticated &&
                      event.bookedAttendees
                        .map((m) => m.contactId)
                        .includes(contactData["@id"]) ? (
                      <div className="planning-cell planning-cta ">
                        <span className="span-complet">Déjà réservé </span>
                      </div>
                    ) : (
                      <ReservationButton
                        i={event.id.replace(/^\D+/g, "")}
                        coach={event.coach && event.coach.replace(/^\D+/g, "")}
                        btnName={
                          "réserver"
                          // +
                          // "(" +
                          // event.bookedAttendees.length +
                          // "/" +
                          // event.attendingLimit +
                          // ")"
                        }
                      />
                    )}
                  </div>
                </li>
              </ul>
            ))
          : null}
        {loading ? <WhiteSpinnerLoading loading={loading} /> : null}
      </div>
      <section className="explore-planning content">
        <div className="w_grid no-gutter">
          <div className="grid-col col_size-12">
            <h3 className="text-fit">Planning Everest</h3>{" "}
          </div>
        </div>
      </section>{" "}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    membersReducer: state.MembersReducer,
    authReducer: state.AuthReducer,
  };
};
export default connect(mapStateToProps, null)(PlanningList);