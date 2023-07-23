import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NewMessageModal from "./modals/aspect";
import ReplyNewMessageModal from "./modals/reply";
import {
  ContactUsDetails,
  deleteContactUsProspects,
  getContactUsProspects,
} from "../../../../../redux/actions/MessageProspectAction";
import { toggle } from "../../../../../redux/actions/AdminActions";
import Swal from "sweetalert2/src/sweetalert2.js";
import TableBackOffice from "../../../../common-components/table-back-office";
import { LOAD_MESSAGE_EVEREST } from "../../../../graphQL/Queries";
import { useQuery } from "@apollo/client";
import { theadMessage } from "../../../../../data/admin/lists/tableHead";

function NouveauMessages(props) {
  const { searching, searchDate, searchMonth, searchDateState } =
    props.searchingResult;

  const [messagesList, setMessagesList] = useState([]);

  const {
    loading: loadingMessageEverest,
    error: errorMessageEverest,
    data: dataMessageEverest,
    refetch,
  } = useQuery(LOAD_MESSAGE_EVEREST, {
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
    if (dataMessageEverest) {
      setMessagesList(dataMessageEverest.getMessagesEverest);
    }
  }, [dataMessageEverest]);

  const onIconDelete = async (contactUsProspect) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer le message de" +
          contactUsProspect.contactEverest &&
        contactUsProspect.contactEverest.givenName + " ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, Supprimer!",
      customClass: {
        cancelButton: "btn-ev btn-black",
        confirmButton: "btn-ev",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await props.deleteContactUsProspects(contactUsProspect._id);
        Swal.fire(
          "Supprimé ! le message de",
          contactUsProspect.contactEverest &&
            contactUsProspect.contactEverest.givenName +
              " est supprimé avec succès.",
          "success"
        );
        setTimeout(() => {
          refetch({
            filter: {
              searching: searching,
              searchMonth: searchMonth && searchMonth.toString(),
              searchDateState: searchDateState,
              searchDate: searchDate,
            },
          });
        }, 2000);
      }
    });
  };

  const onIconReply = async (contactUsProspect) => {
    await props.ContactUsDetails(contactUsProspect);
    props.toggle("replyContactUsModal", true);
  };

  return (
    <>
      {messagesList && (
        <TableBackOffice
          loading={loadingMessageEverest}
          listData={messagesList}
          theadData={theadMessage}
          tbody={messagesList.map((contactUsProspect, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {contactUsProspect.contactEverest &&
                  contactUsProspect.contactEverest.givenName +
                    " " +
                    contactUsProspect.contactEverest &&
                  contactUsProspect.contactEverest.familyName}
              </td>
              <td>{contactUsProspect.email && contactUsProspect.email}</td>
              <td>
                {contactUsProspect.contactEverest &&
                  contactUsProspect.contactEverest.mobile}
              </td>
              <td>
                <span>{contactUsProspect?.date.split("T")[0]}</span>
                <span>
                  {contactUsProspect?.date.split("T")[1].split(".")[0]}
                </span>
              </td>
              <td>
                {contactUsProspect?.message.map((message, i) => (
                  <div key={i}>-{message}</div>
                ))}
              </td>
              <td className="actions-cell">
                <i
                  onClick={() => onIconDelete(contactUsProspect)}
                  className="fas fa-trash-alt"
                />
                <i
                  onClick={() => onIconReply(contactUsProspect)}
                  className="fas fa-reply"
                />
              </td>
            </tr>
          ))}
        />
      )}
      <NewMessageModal />
      <ReplyNewMessageModal />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getContactUsProspects: (filter, skip) => {
    dispatch(getContactUsProspects(filter, skip));
  },

  deleteContactUsProspects: (messageId) => {
    dispatch(deleteContactUsProspects(messageId));
  },
  ContactUsDetails: (contact) => {
    dispatch(ContactUsDetails(contact));
  },
  toggle: (toggleName, etat) => {
    dispatch(toggle(toggleName, etat));
  },
});
const mapStateToProps = (state) => {
  return {
    contactUsProspectReducer: state.ContactUsProspectReducer,
    searchingResult: state.SearchingReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NouveauMessages);
