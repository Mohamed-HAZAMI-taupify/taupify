import React, { useEffect } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2/src/sweetalert2";
import { theadTaupify } from "../../../../../data/admin/lists/tableHead";
import { toggle } from "../../../../../redux/actions/AdminActions";
import {
  deleteTaupifyContact,
  getTaupifyContacts,
  taupifyContactDetails,
} from "../../../../../redux/actions/taupify/ContactAction";
import TableBackOffice from "../../../../common-components/table-back-office";
import ConnectedTaupifyContactModal from "./modals/aspect";

const TaupifyList = (props) => {
  useEffect(() => {
    props.getTaupifyContacts();
  }, []);

  const { taupifyContactList } = props.taupifyContactReducer;

  const onIconDelete = async (contact) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer le contact" +
        contact.givenName +
        " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",

      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        props.deleteTaupifyContact(contact._id);
      }
    });
  };

  const onIconDetails = async (contact) => {
    await props.toggle("taupifyContactDetails", true);

    props.taupifyContactDetails(contact);
  };

  return (
    <>
      {taupifyContactList && (
        <TableBackOffice
          listData={taupifyContactList}
          theadData={theadTaupify}
          tbody={taupifyContactList.map((contact, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{contact.givenName + " " + contact.familyName}</td>
              <td>{contact.email}</td>
              <td>{contact.phoneNumber}</td>
              <td>{contact.message ? contact.message : "--"}</td>
              <td>
                <span>{contact.date.split("T")[0]}</span> &ensp;&ensp;
                <span>{contact.date.split("T")[1].split(".")[0]}</span>
              </td>
              <td className="actions-cell">
                <i
                  onClick={() => onIconDelete(contact)}
                  className="fas fa-trash-alt"
                />

                <i
                  onClick={() => onIconDetails(contact)}
                  className="fas fa-search-plus"
                />
              </td>
            </tr>
          ))}
        />
      )}
      <ConnectedTaupifyContactModal />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getTaupifyContacts: (filter) => {
    dispatch(getTaupifyContacts(filter));
  },

  deleteTaupifyContact: (id) => {
    dispatch(deleteTaupifyContact(id));
  },
  taupifyContactDetails: (id) => {
    dispatch(taupifyContactDetails(id));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    alertReducer: state.AlertReducer,
    taupifyContactReducer: state.TaupifyContactReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaupifyList);
