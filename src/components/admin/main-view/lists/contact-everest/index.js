import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";
import { LOAD_CONTACT_EVEREST_FILTER } from "../../../../graphQL/Queries";
import {
  contactEverestDetails,
  updateContactUser,
  deleteContactEverest
} from "../../../../../redux/actions/ContactEverestActions";
import { toggle } from "../../../../../redux/actions/AdminActions";
import Swal from "sweetalert2/src/sweetalert2.js";
import ContactEverestAspectModal from "./modals/aspect";
import UpdateContactEverestModal from "./modals/update";
import TableBackOffice from "../../../../common-components/table-back-office";
import { theadContactEverest } from "../../../../../data/admin/lists/tableHead";

function ContactEverest(props) {
  const { searching, searchDate, searchMonth, searchDateState, page } =
    props.searchingResult;

  const [contactList, setContactList] = useState([]);
  const { actifPath } = props.adminReducer;
  const {
    loading: loadingFiltredContactEverest,
    error: errorFiltredContactEverest,
    data: dataFiltredContactEverest,
  } = useQuery(LOAD_CONTACT_EVEREST_FILTER, {
    variables: {
      filter: {
        state: props.state,
        sourceId: props.sourceId,
        searching: searching,
        searchMonth: searchMonth && searchMonth.toString(),
        searchDateState: searchDateState,
        searchDate: searchDate,
        page: page,
      },
    },
  });

  useEffect(() => {
    if (
      dataFiltredContactEverest &&
      props.state === null &&
      props.sourceId === null &&
      searching === "" &&
      searchMonth === "" &&
      !searchDateState
    ) {
      setContactList([
        ...contactList,
        ...dataFiltredContactEverest.getContactEverest,
      ]);
    }

    if (
      actifPath !== "contact-everest" &&
      dataFiltredContactEverest &&
      searching === "" &&
      searchMonth === "" &&
      !searchDateState
    ) {
      setContactList([
        ...contactList,
        ...dataFiltredContactEverest.getContactEverest,
      ]);
    }

    if (
      actifPath !== "contact-everest" &&
      dataFiltredContactEverest &&
      (searching !== "" || searchMonth !== "" || searchDateState)
    ) {
      setContactList(dataFiltredContactEverest.getContactEverest);
    }

    if (
      actifPath == "contact-everest" &&
      dataFiltredContactEverest &&
      (props.state !== null ||
        props.sourceId !== null ||
        searching !== "" ||
        searchMonth !== "" ||
        searchDateState)
    ) {
      setContactList(dataFiltredContactEverest.getContactEverest);
    }
  }, [dataFiltredContactEverest]);

  const onIconDelete = async (contact) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir archiver le prospect " +
        contact.givenName +
        " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Archiver!",
      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await props.deleteContactEverest(contact.id, {
          state: "lost_client",
        });
        Swal.fire(
          "Archivé !",
          contact.givenName + " est archivé avec succès.",
          "success"
        );
      }
    });
  };

  const onIconEdit = async (contact) => {
    await props.contactEverestDetails(contact);
    props.toggle("updateContactEverestModal", true);
  };

  const onIconDetails = async (contact) => {
    await props.contactEverestDetails(contact);
    props.toggle("contactEverestDetailsModal", true);
  };

  return (
    <>
      {contactList && (
        <TableBackOffice
          fileName={actifPath}
          listData={contactList}
          theadData={theadContactEverest}
          page={page}
          tbody={contactList.map((contact, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {contact.givenName && contact.familyName
                  ? contact.givenName + " " + contact.familyName
                  : "--"}
              </td>
              <td>{contact.email}</td>
              <td>{contact.mobile ? contact.mobile : "--"}</td>
              <td>{contact.subscribe === false ? "non" : "oui"}</td>
              <td>{contact.sourceId ? contact.sourceId : "--"}</td>

              <td>{contact.state ? contact.state : "--"}</td>

              <td>
                <span>{contact.createdAt.split("T")[0]}</span> &ensp;&ensp;
                <span>{contact.createdAt.split("T")[1].split(".")[0]}</span>
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
      <ContactEverestAspectModal />
      <UpdateContactEverestModal />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    searchingResult: state.SearchingReducer,
    adminReducer: state.AdminReducer,
  };
};
const mapDispatchToProps = (dispatch) => ({
  contactEverestDetails: (contact) => {
    dispatch(contactEverestDetails(contact));
  },

  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },

  updateContactUser: (contactEverestID, data) => {
    dispatch(updateContactUser(contactEverestID, data));
  },

  deleteContactEverest: (contactEverestID, data) => {
    dispatch(deleteContactEverest(contactEverestID, data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactEverest);