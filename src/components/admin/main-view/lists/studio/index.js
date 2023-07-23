import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { LOAD_BACK_OFFICE_STUDIOS } from "../../../../graphQL/Queries";
import { useQuery } from "@apollo/client";
import Swal from "sweetalert2/src/sweetalert2.js";
import TableBackOffice from "../../../../common-components/table-back-office";
import StudioDetailsModal from "./modals/aspect";
import UpdateStudioModal from "./modals/update";
import {
  deleteStudio,
  StudioDetails,
} from "../../../../../redux/actions/StudiosActions";
import { toggle } from "../../../../../redux/actions/AdminActions";
import { theadStudio } from "../../../../../data/admin/lists/tableHead";

const Studio = (props) => {
  const { searching, searchDate, searchMonth, searchDateState } =
    props.searchingResult;


  const [studioList, setStudioBackList] = useState([]);
  const {
    loading: loadingFiltredStudios,
    error: errorFiltredStudios,
    data: dataFiltredStudios,
  } = useQuery(LOAD_BACK_OFFICE_STUDIOS, {
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
    if (dataFiltredStudios) {
      setStudioBackList(dataFiltredStudios.getBackOfficeStudios);
    }
  }, [dataFiltredStudios]);
  const onIconDelete = async (studio) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer le studio " + studio.name + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",
      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteStudio(studio.id.replace(/^\D+/g, ""));
      }
    });
  };

  const onIconEdit = async (studio) => {
    await props.StudioDetails(studio);
    props.toggle("updateStudioModal", true);
  };

  const onIconDetails = async (studio) => {
    props.StudioDetails(studio);
    props.toggle("studioDetailsModal", true);
  };
  return (
    <>
      {studioList && (
        <TableBackOffice
          loading={loadingFiltredStudios}
          listData={studioList}
          theadData={theadStudio}
          tbody={studioList.map((studio, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{studio.name}</td>
              <td>{studio.streetAddress ? studio.streetAddress : "--"}</td>
              <td>{studio.postalCode ? studio.postalCode : "--"}</td>
              <td>{studio.addressLocality ? studio.addressLocality : "--"}</td>
              <td>{studio.addressCountry ? studio.addressCountry : "--"}</td>
              <td>{studio.clubObject.name}</td>
              <td>
                <span>{studio.createdAt.split("T")[0]}</span> &ensp;&ensp;
                <span>{studio.createdAt.split("T")[1].split(".")[0]}</span>
              </td>
              <td className="actions-cell">
                <i
                  onClick={() => onIconDelete(studio)}
                  className="fas fa-trash-alt"
                />
                <i
                  onClick={() => onIconEdit(studio)}
                  className="fas fa-user-edit"
                />
                <i
                  onClick={() => onIconDetails(studio)}
                  className="fas fa-search-plus"
                />
              </td>
            </tr>
          ))}
        />
      )}
      <StudioDetailsModal />
      <UpdateStudioModal />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    searchingResult: state.SearchingReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteStudio: (studioId) => {
    dispatch(deleteStudio(studioId));
  },

  StudioDetails: (studio) => {
    dispatch(StudioDetails(studio));
  },

  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Studio);
