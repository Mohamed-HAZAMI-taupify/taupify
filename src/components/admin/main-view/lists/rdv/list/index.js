import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteRdv,
  getfilteredRdvs,
  getAllNotCanceledRdvs,
  getAllCanceledRdvs,
} from "../../../../../../redux/actions/RdvActions";
import { IconButton } from "@material-ui/core";
import Swal from "sweetalert2/src/sweetalert2.js";
import { Tooltip } from "@material-ui/core";
import SpinnerLoadings from "../../../../../common-components/spinner-loanding";
import { handleScrollPage } from "../../../../../../redux/actions/Searching";
import NotFoundBody from "../../../../../common-components/not-found/Body";

const DATE_OPTIONS = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

function RendezVousList(props) {
  const {
    searching,
    searchDate,
    searchMonth,
    searchDateState,
    page,
    switched,
  } = props.searchingResult.searching;
  const { filteredRdvs, loading } = props.rendezVousReducer;

  useEffect(() => {
    props.getfilteredRdvs();
  }, []);

  const handleScroll = async (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight + 1) {
      await props.handleScrollPage(page + 1);
      props.getfilteredRdvs(
        {
          searching,
          searchDate,
          searchMonth,
          searchDateState,
          page,
          switched,
        },
        true
      );
    }
  };

  if (loading) {
    return <SpinnerLoadings loading={loading} />;
  }

  return !filteredRdvs && !loading ? (
    <NotFoundBody />
  ) : (
    <tbody className="tbody-rdv" onScroll={handleScroll}>
      {filteredRdvs.map((rdv, index) => (
        <tr key={index}>
          <td className="num-column-rdv">{index + 1}</td>
          <td className="name-column-rdv">
            {rdv.firstname + " " + rdv.lastname}
          </td>
          <td className="email-column-rdv">{rdv.email}</td>
          <td className="tel-column-rdv">{rdv.phone}</td>
          <td className="daterdv-column-rdv">
            {new Date(rdv.plannedForDate).toLocaleDateString(
              "fr",
              DATE_OPTIONS
            )}
          </td>
          <td className="heure-column-rdv">{rdv.plannedForTime}</td>
          <td className="date-demande-column-rdv">
            <span>{rdv.createdAt.split("T")[0]} </span> &ensp;&ensp;{" "}
            <span> {rdv.createdAt.split("T")[1].split(".")[0]}</span>
          </td>
          <td className="annuler-column-rdv">
            {rdv.isCanceled ? "oui" : "non"}
          </td>
          <td className="motif-column-rdv">{rdv.cancelReason}</td>
          <td className="actions-column-rdv">
            <Tooltip title="Supprimer : rdv">
              <IconButton
                onClick={() => {
                  Swal.fire({
                    title: "Etes-vous sûr?",
                    text:
                      "êtes-vous sûr de vouloir supprimer le rendez-vous de " +
                      rdv.prenom +
                      " ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Oui, Supprimer!",
                    customClass: {
                      cancelButton: "btn-ev btn-black",
                      confirmButton: "btn-ev",
                    },
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      await props.deleteRdv(rdv._id);

                      Swal.fire(
                        "Supprimé !",
                        "le rendez-vous de " +
                          rdv.prenom +
                          " est supprimé avec succès.",
                        "success"
                      );
                    }
                  });
                }}
                color="secondary"
                aria-label="delete"
              >
                <span className="trash-icon">
                  <i className="fas fa-trash-alt"></i>
                </span>
              </IconButton>
            </Tooltip>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
const mapDispatchToProps = (dispatch) => ({
  getfilteredRdvs: (filter, skip) => {
    dispatch(getfilteredRdvs(filter, skip));
  },
  deleteRdv: (filter, skip) => {
    dispatch(deleteRdv(filter, skip));
  },
  handleScrollPage: (page) => {
    dispatch(handleScrollPage(page));
  },
  getAllCanceledRdvs: () => {
    dispatch(getAllCanceledRdvs());
  },
  getAllNotCanceledRdvs: () => {
    dispatch(getAllNotCanceledRdvs());
  },
});
const mapStateToProps = (state) => {
  return {
    rendezVousReducer: state.RendezVousReducer,
    searchingResult: state.SearchingReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RendezVousList);
