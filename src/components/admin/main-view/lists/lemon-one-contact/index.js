import React, { useEffect } from "react";
import {
  deleteLemonOneContact,
  getLemonOneContacts,
} from "../../../../../redux/actions/lemon-one/ContactActions";
import { connect } from "react-redux";
import Swal from "sweetalert2/src/sweetalert2";
import { theadLemonOne } from "../../../../../data/admin/lists/tableHead";
import TableBackOffice from "../../../../common-components/table-back-office";

function LemonOneContact(props) {
  const { lemonOneContactList, loading } = props.lemonOneContactReducer;
  const { searching, searchDate, searchMonth, searchDateState } =
    props.searchingResult;
  useEffect(() => {
    props.getLemonOneContacts({
      searching, searchDate, searchMonth, searchDateState
    });
  }, []);
  const onIconDelete = async (contact) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer le prospect " +
        contact.givenName +
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
        await props.deleteLemonOneContact(contact._id);
        Swal.fire(
          "Supprimé !",
          contact.givenName + " est supprimé avec succès.",
          "success"
        );
      }
    });
  };

  return (
    <>
      {lemonOneContactList && (
        <TableBackOffice
          loading={loading}
          listData={lemonOneContactList}
          theadData={theadLemonOne}
          tbody={lemonOneContactList.map((contact, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{contact.givenName + " " + contact.familyName}</td>
              <td>{contact.email}</td>
              <td>{contact.mobile}</td>
              <td>
                <span>{contact.createdAt.split("T")[0]}</span>
                <span>{contact.createdAt.split("T")[1].split(".")[0]}</span>
              </td>
              <td>{contact.motivation}</td>
              <td>{contact.club}</td>
              <td className="actions-cell">
                <i
                  onClick={() => onIconDelete(contact)}
                  className="fas fa-trash-alt"
                />
              </td>
            </tr>
          ))}
        />
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getLemonOneContacts: (filter) => {
    dispatch(getLemonOneContacts(filter));
  },
  deleteLemonOneContact: (id) => {
    dispatch(deleteLemonOneContact(id));
  },
});
const mapStateToProps = (state) => {
  return {
    lemonOneContactReducer: state.LemonOneContactReducer,
    searchingResult: state.SearchingReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LemonOneContact);
