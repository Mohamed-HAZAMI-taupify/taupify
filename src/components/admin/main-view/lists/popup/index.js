import React, { useEffect, useState } from "react";
import TableBackOffice from "../../../../common-components/table-back-office";
import { connect } from "react-redux";
import {
  editPopUp,
  editStatePopUp,
  getPopUps,
  popUpDetails,
} from "../../../../../redux/actions/PopUpAction";
import { theadPopUp } from "../../../../../data/admin/lists/tableHead";
import { toggle } from "../../../../../redux/actions/AdminActions";
import AspectPopUpModal from "./modals/aspect";
import UpdatePopUpModal from "./modals/update";
import ReactHtmlParser from "react-html-parser";
import Swal from "sweetalert2/src/sweetalert2";

const PopUpHomePage = (props) => {
  const { popupList, loading } = props.popUpReducer;
  const { searching, searchDate, searchMonth, searchDateState } =
    props.searchingResult;
  useEffect(() => {
    props.getPopUps(searching, searchDate, searchMonth, searchDateState);
  }, []);

  const onIconEdit = async (popup) => {
    await props.popUpDetails(popup);
    props.toggle("updatePopup", true);
  };

  const onIconDetails = async (popup) => {
    props.popUpDetails(popup);
    props.toggle("aspectPopup", true);
  };

  const onIconDelete = async (popup) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text: "êtes-vous sûr de vouloir archiver ce popup ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Archiver!",
      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        props.editPopUp(popup?._id, {state: "archived"});
      }
    });
  };

  const handleChangePopupState = (popup) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text: "êtes-vous sûr de vouloir changer l'état du pop-up ? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Changer!",
      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        props.editStatePopUp(popup?._id);
      }
    });
  };

  return (
    <>
      {popupList && (
        <TableBackOffice
          loading={loading}
          listData={popupList}
          theadData={theadPopUp}
          tbody={popupList.map((popup, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="radio"
                  value={popup.state}
                  checked={popup.state && popup.state === "home"}
                  onClick={() => handleChangePopupState(popup)}
                />
              </td>
              <td>{popup.title.title}</td>
              <td>{popup.subtitle.subtitle}</td>
              <td>{popup.description.description}</td>
              <td>{popup.state}</td>
              <td className="actions-cell">
                <i
                  onClick={() => onIconDelete(popup)}
                  className="fas fa-trash-alt"
                />
                <i
                  onClick={() => onIconEdit(popup)}
                  className="fas fa-user-edit"
                />
                <i
                  onClick={() => onIconDetails(popup)}
                  className="fas fa-search-plus"
                />
              </td>
            </tr>
          ))}
        />
      )}
      <AspectPopUpModal />
      <UpdatePopUpModal />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getPopUps: (filter) => {
    dispatch(getPopUps(filter));
  },
  editStatePopUp: (id, popUp) => {
    dispatch(editStatePopUp(id, popUp));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
  popUpDetails: (popup) => {
    dispatch(popUpDetails(popup));
  },
  editPopUp: (id, popUp) => {
    dispatch(editPopUp(id, popUp))
  }
});
const mapStateToProps = (state) => {
  return {
    popUpReducer: state.PopUpReducer,
    adminReducer: state.AdminReducer,
    searchingResult: state.SearchingReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopUpHomePage);