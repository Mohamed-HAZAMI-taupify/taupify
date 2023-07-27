import React , { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { useSelector , useDispatch} from "react-redux";
import Select from "react-select";
import CoachCard from "./coach-card";
import { SelectSearchStyle } from "./select-search-style";
import WhiteSpinnerLoading from "../../common-components/spinner-loanding/WhiteSpinnerLoading";
import { NotFoundPage } from "../../common-components/not-found/Page";
import {
  LOAD_ACTIVITIES,
  LOAD_COACHES,
  LOAD_COACHES_WITH_FILTER,
} from "../../graphQL/Queries";
import { useQuery } from "@apollo/client";
import SearchBarFilter from "../../planning/filter";
import { data } from "../../../data/routes/routesData";
import { getCoaches } from "../../../redux/actions/CoachesAction";
import { getActivityRest } from "../../../redux/actions/ActivityRestAction";

const NewCoachGallery = (props) => {
  const hubs = [{ value: "Besancon", label: "Besancon" }];
  const [scroll, setScroll] = React.useState(0);
  const [firstScroll, setFirstScroll] = React.useState(false);
  const [searchActivity, setSearchActivity] = useState(null);
  const [sportList, setSportList] = useState([]);

  const dispatch = useDispatch();
  const coachesReducer = useSelector(state => state.CoachesReducer);
  const ActivityRestReducer = useSelector(state => state.ActivityRestReducer);

  const [coachList, setCoachList] = useState([]);
  const [filtredCoachListGQ, setFiltredCoachListGQ] = useState([]);
  // newCoachsListNums = coachList.map((coach) => coach._id);
  const newCoachsListNums = coachesReducer && coachesReducer.Coaches.map((coach) => coach._id);

  useEffect(() => {
    dispatch(getCoaches());
    dispatch(getActivityRest());
  }, []);


  useEffect(() => {
    setSportList(coachesReducer && coachesReducer.Coaches)
  }, [ActivityRestReducer.loading]);

  const {
    loading: loadingFiltredCoach,
    error: errorFiltredCoach,
    data: dataFiltredCoaches,
  } = useQuery(LOAD_COACHES_WITH_FILTER, {
    variables: {
      filter: {
        activity_contains: searchActivity,
      },
    },
  });
  
  const { data: dataCoach } = useQuery(LOAD_COACHES);

  const { loading: loadingActivities, data: dataActivities } = useQuery(LOAD_ACTIVITIES);


  // React.useEffect(() => {
  //   document.addEventListener("scroll", () => {
  //     const scrollCheck = window.scrollY > "100px";
  //     if (window.scrollY > 300 && !firstScroll) {
  //       setScroll(scrollCheck);
  //       setFirstScroll(true);
  //     }
  //   });
  //   !scroll && window.scrollTo(0, 0);
  //   if (dataActivities) {
  //     setSportList(dataActivities.activities);
  //   }
  //   if (dataFiltredCoaches) {
  //     setFiltredCoachListGQ(dataFiltredCoaches.getfiltredCoaches);
  //   }
  //   if (dataCoach) {
  //     setCoachList(dataCoach.coaches);
  //   }
  // }, [dataActivities, dataFiltredCoaches, dataCoach]);



  const handlerFilter = (envent) => {
    if (envent === null) {
      setSportList(coachesReducer && coachesReducer.Coaches);
    } else {
      setSportList(
        coachesReducer && coachesReducer.Coaches.filter(item => {
          // Check if 'envent' is an array and 'item.activities' exists and contains any activity with a 'label' that exists in the 'envent' array
          return Array.isArray(envent) && item.activities && item.activities.some(activity => envent.some(elem => elem.label === activity.label));
        })
      );
    }
  }

  return (
    <div className="coach-container">
      <div>
        <div className="coach-header">
          <div>
            <h1 className="new-coach-title-xl"> Les trainers </h1>
            <div className="text-regularr">
              <span>
                Everest Sport Club a réuni pour vous les meilleurs coachs de la
                région. Démarrez l’expérience Everest en faisant partie de nos
                membres.
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="search-div">
            <form className="my-form">
              <div className="container-search-coach">
                <ul className="ul-coach">
                  <li>
                    <div className="grid grid-2">
                      <SearchBarFilter
                        placeholder="Sports"
                        options={
                          ActivityRestReducer.loading === false
                            ? ActivityRestReducer && ActivityRestReducer.activityList.map((e) => ({
                                label: e.name,
                                value: e.id,
                              }))
                            : null
                        }
                        // onChange={(event) => {
                        //   event !== null
                        //     ? setSearchActivity(event.map((t) => t.label))
                        //     : setSearchActivity(null);
                        // }}
                        onChange={(event) => handlerFilter(event)}
                        isMulti={true}
                        isLoading={ActivityRestReducer.loading}
                      />

                      <Select
                        isClearable
                        placeholder="clubs"
                        options={hubs}
                        styles={SelectSearchStyle}
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>

        {/* {errorFiltredCoach ||
        (!filtredCoachListGQ.length && !loadingFiltredCoach) ? (
          <NotFoundPage src="https://i.ibb.co/KbGcph1/trainer.png" />
        ) : null}

        {loadingFiltredCoach ? (
          <WhiteSpinnerLoading loading={loadingFiltredCoach} />
        ) : (
          <div>
            <div className="coachgallery">
              <motion.div
                className="coachthumbnails"
                initial="initial"
                animate="enter"
                exit="exit"
              >
                {filtredCoachListGQ.map((coach, i) => (
                  <CoachCard
                    k={newCoachsListNums.indexOf(coach._id)}
                    key={coach._id}
                    image={coach.image._url}
                    name={coach.givenName}
                    coach={coach}
                    desciption={coach.description}
                    i={coach._id}
                    id_resamania={coach.id_resamania_prod ? coach.id_resamania_prod : coach.id_resamania}
                  />
                ))}
              </motion.div>
            </div>

            <div className="coach-footer">
              <a href={data.rdv_navbar_vente_flash} className="rdv-pop-up-link">
                <button className=" btn-ev btn-rdv-coach hvr-transparent uppercase">
                  prendre rendez-vous
                </button>
              </a>
              <h1 className="title-bottom"> TRAINERS EVEREST </h1>
            </div>
          </div>
        )} */}

        <div>
            <div className="coachgallery">
              {
                !ActivityRestReducer.loading ?
              
              <motion.div
                className="coachthumbnails"
                initial="initial"
                animate="enter"
                exit="exit"
              >
                {sportList.map((coach, i) => (
                  <CoachCard
                    k={newCoachsListNums.indexOf(coach._id)}
                    key={coach._id}
                    image={coach.image._url}
                    name={coach.givenName}
                    coach={coach}
                    desciption={coach.description}
                    i={coach._id}
                    id_resamania={coach.id_resamania_prod ? coach.id_resamania_prod : coach.id_resamania}
                  />
                ))}
              </motion.div>
                :
              <NotFoundPage src="https://i.ibb.co/KbGcph1/trainer.png" />
            }
            </div>

            <div className="coach-footer">
              <a href={data.rdv_navbar_vente_flash} className="rdv-pop-up-link">
                <button className=" btn-ev btn-rdv-coach hvr-transparent uppercase">
                  prendre rendez-vous
                </button>
              </a>
              <h1 className="title-bottom"> TRAINERS EVEREST </h1>
            </div>
          </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
  };
};

export default connect(mapStateToProps, null)(NewCoachGallery);