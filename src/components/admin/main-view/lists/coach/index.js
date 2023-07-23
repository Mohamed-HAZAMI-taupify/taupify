import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";
import { LOAD_BACK_OFFICE_COACHES } from "../../../../graphQL/Queries";
import {
  deleteNewCoach,
  coachListDetails,
} from "../../../../../redux/actions/CoachActions";
import { toggle } from "../../../../../redux/actions/AdminActions";
import Swal from "sweetalert2/src/sweetalert2.js";
import UpdateNewCoach from "./modals/update";
import CoachModal from "./modals/aspect";
import TableBackOffice from "../../../../common-components/table-back-office";
import { theadCoach } from "../../../../../data/admin/lists/tableHead";
import { getCoaches } from "../../../../../redux/actions/CoachesAction";
import { useSelector , useDispatch} from "react-redux";
import { _base_url_coach } from "../../../../../data/config";

import { CircularProgress, Snackbar, Button } from "@mui/material";
import axios from "axios";

const Coachs = (props) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { searching, searchDate, searchMonth, searchDateState } =
  props.searchingResult;
const [coachList, setCoachList] = useState([]);
const { loading: loadingFiltredCoach, data: dataFiltredCoaches, refetch: refetchCoaches } = useQuery(
  LOAD_BACK_OFFICE_COACHES,
  {
    variables: {
      filter: {
        searching: searching,
        searchMonth: searchMonth && searchMonth.toString(),
        searchDateState: searchDateState,
        searchDate: searchDate,
      },
    },
  }
);

const handleButtonClick = async () => {
  try {
    setLoading(true);
    const response = await axios.get(_base_url_coach + "/synchronisationAllCoach");
    if (response.status === 200) {
      setMessage("Coaches updated successfully");
      // Manually trigger a refetch of the coach data
      refetchCoaches();
    } else {
      setMessage("An error occurred");
    }
    setOpenSnackbar(true);
  } catch (error) {
    setMessage("An error occurred");
    setOpenSnackbar(true);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (dataFiltredCoaches) {
    setCoachList(dataFiltredCoaches.getBackOfficeCoaches);
  }
}, [dataFiltredCoaches]);




  const onIconDelete = async (coach) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer le coach " + coach.givenName + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",
      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteNewCoach(coach._id);
      }
    });
  };

  const onIconEdit = async (coach) => {
    await props.coachListDetails(coach);
    props.toggle("updateCoachModal", true);
  };

  const onIconDetails = async (coach) => {
    await props.coachListDetails(coach);
    props.toggle("coachDetailsModal", true);
  };

  const dispatch = useDispatch();
  const coachesReducer = useSelector(state => state.CoachesReducer);
  useEffect(() => {
    dispatch(getCoaches());
  }, []);
  

  return (
    <>

    {console.log("zzz coachList" , coachList)}
    {/* {console.log("zzz coachesReducer" , coachesReducer)} */}
    <div style={{ 
                  width: "100%" ,
                  display: "flex" ,
                  justifyContent: "flex-start"
                }}>
           <Button variant="contained" 
                   style={{ 
                            width: "200px" ,
                            height: "30px" ,
                            marginBottom: "-200px",
                            marginTop: "20px"
                          }}
                   onClick={handleButtonClick}>
              synchronisation 
           </Button>
    </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />

      {
      !(loading && <CircularProgress />) ? (
      coachList && (
<TableBackOffice
  loading={loadingFiltredCoach}
  listData={coachList}
  theadData={theadCoach}
  tbody={coachList.map((coach, index) => {
    if (!coach.image._url) {
      return null; // Exclude the row from rendering
    }
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td className="img-column-coach">
          <img src={coach.image._url} alt="Coach" />
        </td>
        <td>{coach.givenName + " " + coach.familyName}</td>
        <td>{coach.alternateName ? coach.alternateName : "--"}</td>
        <td className="sport-column-coach">
          <ul>
            {coach.activities.map((activity, i) => (
              <li key={i}>{activity.label}</li>
            ))}
          </ul>
        </td>
        <td>
          <span className="social-links">
            {coach.socialmedia.instagram !== "" ? (
              <a
                href={coach.socialmedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            ) : (
              <h3>--</h3>
            )}
            {coach.socialmedia.facebook !== "" ? (
              <a
                href={coach.socialmedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-square"></i>
              </a>
            ) : (
              <h3>--</h3>
            )}
            {coach.socialmedia.youtube !== "" ? (
              <a
                href={coach.socialmedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
            ) : (
              <h3>--</h3>
            )}
          </span>
        </td>
        <td className="description-overflowed">{coach.description}</td>
        <td>{coach.phone !== null ? coach.phone : "--"}</td>
        <td>{coach.email !== "" ? coach.email : "--"}</td>
        <td className="actions-cell">
          <i onClick={() => onIconDelete(coach)} className="fas fa-trash-alt" />
          <i onClick={() => onIconEdit(coach)} className="fas fa-user-edit" />
          <i onClick={() => onIconDetails(coach)} className="fas fa-search-plus" />
        </td>
      </tr>
    );
  })}
/>


      )):
      <div style={{
                    height: "calc(100vh - 440px)" ,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}>
                     {loading && <CircularProgress />}
      </div>
      
      
      }
      <UpdateNewCoach />
      <CoachModal />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteNewCoach: (coachID) => {
    dispatch(deleteNewCoach(coachID));
  },
  coachListDetails: (coach) => {
    dispatch(coachListDetails(coach));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    searchingResult: state.SearchingReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coachs);
