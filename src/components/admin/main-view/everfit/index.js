import React, { useEffect } from "react";
import { toggle } from "../../../../redux/actions/AdminActions";
import {
  deleteEverfitContact,
  everfitContactDetails,
  getEverfitContacts,
} from "../../../../redux/actions/everfit/ContactActions";
import EverfitContactModal from "./list/modals/aspect";
import UpdateEverfitContact from "./list/modals/update";
import Swal from "sweetalert2/src/sweetalert2";
import TableBackOffice from "../../../common-components/table-back-office";
import { connect } from "react-redux";
import { theadEverfit } from "../../../../data/admin/lists/tableHead";

const EverfitTab = (props) => {
  const { everfitContactList } = props.contactReducer;

  useEffect(() => {
    props.getEverfitContacts();
  }, []);

  const onIconDelete = async (contact) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer le contact Everfit " +
        contact.firstname +
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
        props.deleteEverfitContact(contact._id);
      }
    });
  };

  const onIconEdit = async (contact) => {
    await props.everfitContactDetails(contact);

    props.toggle("everfitContactEdit", true);
  };

  const onIconDetails = async (contact) => {
    await props.toggle("everfitContactDetail", true);

    props.everfitContactDetails(contact);
  };
  return (
    <>
      {everfitContactList && (
        <TableBackOffice
          listData={everfitContactList}
          theadData={theadEverfit}
          tbody={everfitContactList.map((contact, index) => (
            <tr key={index}>
              <td>{contact.number}</td>
              <td>{contact.givenName + " " + contact.familyName}</td>
              <td>{contact.email}</td>
              <td>{contact.mobile}</td>
              <td>{contact.postalCode}</td>
               <td>{contact.BPJEPSAF}</td>
              <td>{contact.certificate}</td>
              <td>{contact.source ? contact.source : "--"}</td>
              <td>{contact.motivation ? contact.motivation : "--"}</td>
              <td>{contact.deliverableMail === false ? "non" : "oui"}</td>
              <td>
                <span>{contact.createdAt ? contact.createdAt.split("T")[0] : "--"}</span>
                <span>{contact.createdAt ? contact.createdAt.split("T")[1].split(".")[0] : "--"}</span>
              </td>
              <td className="actions-cell">
                <i
                  onClick={() => onIconDelete(contact)}
                  className="fas fa-trash-alt"
                />
                <i
                  onClick={() => onIconEdit(contact)}
                  className="fas fa-user-edit"
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
      <EverfitContactModal />
      <UpdateEverfitContact />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getEverfitContacts: (filter) => {
    dispatch(getEverfitContacts(filter));
  },

  deleteEverfitContact: (id) => {
    dispatch(deleteEverfitContact(id));
  },
  everfitContactDetails: (id) => {
    dispatch(everfitContactDetails(id));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    contactReducer: state.EverfitContactReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EverfitTab);
