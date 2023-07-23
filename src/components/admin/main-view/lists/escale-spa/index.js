import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteEscaleSpaContact,
  getEscaleSpaContacts,
} from "../../../../../redux/actions/escale-beaute-spa/ContactActions";
import Swal from "sweetalert2/src/sweetalert2";
import TableBackOffice from "../../../../common-components/table-back-office";
import { theadEscaleSpa } from "../../../../../data/admin/lists/tableHead";

const EscaleSpaContact = (props) => {
  const { escaleSpaContactList, loading } = props.escaleSpaContactReducer;

  useEffect(() => {
    props.getEscaleSpaContacts();
  }, []);
  const onIconDelete = async (escaleSpaContact) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer le prospect " +
        escaleSpaContact.givenName +
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
        await props.deleteEscaleSpaContact(escaleSpaContact._id);
        await props.getEscaleSpaContacts();
        Swal.fire(
          "Supprimé !",
          escaleSpaContact.givenName + " est supprimé avec succès.",
          "success"
        );
      }
    });
  };

  return (
    <>
      {escaleSpaContactList && (
        <TableBackOffice
          loading={loading}
          listData={escaleSpaContactList}
          theadData={theadEscaleSpa}
          tbody={escaleSpaContactList.map((escaleSpaContact, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {escaleSpaContact.givenName + " " + escaleSpaContact.familyName}
              </td>
              <td>{escaleSpaContact.email}</td>
              <td>{escaleSpaContact.mobile}</td>
              <td>
                <span>{escaleSpaContact.createdAt.split("T")[0]}</span> &ensp;
                <span>
                  {escaleSpaContact.createdAt.split("T")[1].split(".")[0]}
                </span>
              </td>
              <td>{escaleSpaContact.message}</td>

              <td className="actions-cell">
                <i
                  onClick={() => onIconDelete(escaleSpaContact)}
                  className="fas fa-trash-alt"
                />
              </td>
            </tr>
          ))}
        />
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getEscaleSpaContacts: (filter, skip) => {
    dispatch(getEscaleSpaContacts(filter, skip));
  },
  deleteEscaleSpaContact: (id) => {
    dispatch(deleteEscaleSpaContact(id));
  },
});
const mapStateToProps = (state) => {
  return {
    escaleSpaContactReducer: state.EscaleSpaContactReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EscaleSpaContact);
