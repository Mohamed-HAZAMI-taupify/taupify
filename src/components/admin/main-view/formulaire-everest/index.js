import React, { useEffect } from "react";
import {
    deleteContactForm,
    getContactForm,
} from "../../../../redux/actions/contact-formulaire/ContactActions";

import Swal from "sweetalert2/src/sweetalert2";
import TableBackOffice from "../../../common-components/table-back-office";
import { connect } from "react-redux";
import { theadtFormulaireEverest } from "../../../../data/admin/lists/tableHead";
import SearchBar from "../lists/search-bar";

const ListFormEverest = (props) => {
    const { ContactFormList } = props.contactReducer;
    const { searching, searchDate, searchMonth, searchDateState } =
    props.searchingResult;
  
    useEffect(() => {
      props.getContactForm(  
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
          props.deleteContactForm(contact._id);
        }
      });
    };
  
    return (
      <>
      <SearchBar />
        {ContactFormList && (
          <TableBackOffice
            listData={ContactFormList}
            theadData={theadtFormulaireEverest}
            tbody={ContactFormList.map((contact, index) => (
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
    getContactForm: (filter) => {
      dispatch(getContactForm(filter));
    },
    deleteContactForm: (id) => {
      dispatch(deleteContactForm(id));
    },
  });
  const mapStateToProps = (state) => {
    return {
      contactReducer: state.ContactFormReducer,
      searchingResult: state.SearchingReducer,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListFormEverest);

