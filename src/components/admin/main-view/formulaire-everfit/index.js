import React, { useEffect } from "react";
import {
    deleteContactFormEverfit,
    getContactFormEverfit,
} from "../../../../redux/actions/contact-formulaire-everfit/ContactActions";

import Swal from "sweetalert2/src/sweetalert2";
import TableBackOffice from "../../../common-components/table-back-office";
import { connect } from "react-redux";
import { theadtFormualireEverfit } from "../../../../data/admin/lists/tableHead";
import SearchBar from "../lists/search-bar";

const ListFormEverfit = (props) => {
    const { ContactEverfitFormList } = props.contactReducer;
    const { searching, searchDate, searchMonth, searchDateState } =
    props.searchingResult;
  
    useEffect(() => {
      props.getContactFormEverfit(  
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
          props.deleteContactFormEverfit(contact._id);
        }
      });
    };
  
    return (
      <>
      <SearchBar />
        {ContactEverfitFormList && (
          <TableBackOffice
            listData={ContactEverfitFormList}
            theadData={theadtFormualireEverfit}
            tbody={ContactEverfitFormList.map((contact, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{contact.givenName + " " + contact.familyName}</td>
                <td>{contact.email}</td>
                <td>{contact.mobile}</td>
                <td>{contact.certificate}</td>
                <td>{contact.BPJEPSAF}</td>
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
    getContactFormEverfit: (filter) => {
      dispatch(getContactFormEverfit(filter));
    },
    deleteContactFormEverfit: (id) => {
      dispatch(deleteContactFormEverfit(id));
    },
  });
  const mapStateToProps = (state) => {
    return {
      contactReducer: state.ContactEverfitFormReducer,
      searchingResult: state.SearchingReducer,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListFormEverfit);


