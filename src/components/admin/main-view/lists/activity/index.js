import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TableBackOffice from "../../../../common-components/table-back-office";
import { LOAD_BACK_OFFICE_ACTIVITIES } from "../../../../graphQL/Queries";
import { asMinutes } from "pomeranian-durations";
import Swal from "sweetalert2/src/sweetalert2.js";
import UpdateActivityModal from "./modals/update";
import ActivityModal from "./modals/aspect";
import {
  getActivityById,
  deleteActivity,
} from "../../../../../redux/actions/ActivityActions";
import { theadActivity } from "../../../../../data/admin/lists/tableHead";

const Activity = (props) => {
  const { searching, searchDate, searchMonth, searchDateState } =
    props.searchingResult;
  const [sportList, setSportList] = useState([]);

  const {
    loading: loadingFiltredActivities,
    error: errorFiltredActivities,
    data: dataFiltredActivities,
  } = useQuery(LOAD_BACK_OFFICE_ACTIVITIES, {
    variables: {
      filter: {
        searching: searching,
        searchMonth: searchMonth && searchMonth.toString(),
        searchDateState: searchDateState,
        searchDate: searchDate,
      },
    },
  });

  useEffect(() => {
    if (dataFiltredActivities) {
      setSportList(dataFiltredActivities.getBackOfficeActivities);
    }
  }, [dataFiltredActivities]);

  const onIconDelete = async (activity) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer l'activité " + activity.name + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",

      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteActivity(activity.id.split("/").pop());
        Swal.fire(
          "Supprimé !",
          activity.name + " est supprimée avec succès.",
          "success"
        );
      }
    });
  };

  const onIconEdit = async (activity) => {
    props.getActivityById(activity.id.split("/").pop(), "updateActivityModal");
  };

  const onIconDetails = async (activity) => {
    props.getActivityById(activity.id.split("/").pop(), "activityDetailsModal");
  };
  return (
    <>
      {sportList && (
        <TableBackOffice
          loading={loadingFiltredActivities}
          listData={sportList}
          theadData={theadActivity}
          tbody={sportList.map((activity, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{activity.name}</td>
              <td>
                {activity.durations.map((duration, i) => (
                  <span key={i}>
                    {duration ? asMinutes(duration) + "Min " : "--"}
                  </span>
                ))}
              </td>
              <td className="actions-cell">
                <i
                  onClick={() => onIconDelete(activity)}
                  className="fas fa-trash-alt"
                />
                <i
                  onClick={() => onIconEdit(activity)}
                  className="fas fa-user-edit"
                />
                <i
                  onClick={() => onIconDetails(activity)}
                  className="fas fa-search-plus"
                />
              </td>
            </tr>
          ))}
        />
      )}
      <ActivityModal />
      <UpdateActivityModal />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    searchingResult: state.SearchingReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteActivity: (activityId) => {
    dispatch(deleteActivity(activityId));
  },
  getActivityById: (activityId, modal) => {
    dispatch(getActivityById(activityId, modal));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
