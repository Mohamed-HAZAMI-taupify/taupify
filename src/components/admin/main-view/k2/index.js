import React, { useEffect } from "react";
import {
  deleteK2Contact,
  getK2Contacts,
} from "../../../../redux/actions/k2/ContactActions";
import Swal from "sweetalert2/src/sweetalert2";
import TableBackOffice from "../../../common-components/table-back-office";
import { connect } from "react-redux";
import { theadK2 } from "../../../../data/admin/lists/tableHead";
import SearchBar from "../lists/search-bar";

const K2List = (props) => {
  const { k2ContactList } = props.contactReducer;
  const { searching, searchDate, searchMonth, searchDateState, page } =
  props.searchingResult;

  useEffect(() => {
    props.getK2Contacts(  
      {
        searching,
        searchDate,
        searchMonth, 
        searchDateState,
    },
    );
  }, []);

  const onIconDelete = async (contact) => {
    Swal.fire({
      title: "Etes-vous sûr?",
      text:
        "êtes-vous sûr de vouloir supprimer le contact  " +
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
        props.deleteK2Contact(contact._id);
      }
    });
  };

  return (
    <>
    <SearchBar />
      {k2ContactList && (
        <TableBackOffice
          listData={k2ContactList}
          theadData={theadK2}
          tbody={k2ContactList.map((contact, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{contact.givenName + " " + contact.familyName}</td>
              <td>{contact.email}</td>
              <td>{contact.mobile}</td>
              <td>{contact.createdAt}</td>
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
};

const mapDispatchToProps = (dispatch) => ({
  getK2Contacts: (filter) => {
    dispatch(getK2Contacts(filter));
  },
  deleteK2Contact: (id) => {
    dispatch(deleteK2Contact(id));
  },
});
const mapStateToProps = (state) => {
  return {
    contactReducer: state.K2ContactReducer,
    searchingResult: state.SearchingReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(K2List);