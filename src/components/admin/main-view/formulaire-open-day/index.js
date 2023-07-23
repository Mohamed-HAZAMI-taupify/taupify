import React, { useEffect } from "react";
import {
    deleteContactOpenDay,
    getContactOpenDay,
} from "../../../../redux/actions/contact-open-day/contactActions";

import Swal from "sweetalert2/src/sweetalert2";
import TableBackOffice from "../../../common-components/table-back-office";
import { connect } from "react-redux";
import { theadtFormualireOpenDay } from "../../../../data/admin/lists/tableHead";
import SearchBar from "../lists/search-bar";

const ListOpenDayEverfit = (props) => {
    const { ContactOpenDay } = props.contactReducer;
    const { searching, searchDate, searchMonth, searchDateState } =
    props.searchingResult;
  
    useEffect(() => {
      props.getContactOpenDay(  
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
          props.deleteContactOpenDay(contact._id);
        }
      });
    };
  
    return (
      <>
      <SearchBar />
        {ContactOpenDay && (
          <TableBackOffice
            listData={ContactOpenDay}
            theadData={theadtFormualireOpenDay}
            tbody={ContactOpenDay.map((contact, index) => (
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
    getContactOpenDay: (filter) => {
      dispatch(getContactOpenDay(filter));
    },
    deleteContactOpenDay: (id) => {
      dispatch(deleteContactOpenDay(id));
    },
  });
  const mapStateToProps = (state) => {
    return {
        
      contactReducer: state.ContactOpenDayReducer,
      searchingResult: state.SearchingReducer,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListOpenDayEverfit);


