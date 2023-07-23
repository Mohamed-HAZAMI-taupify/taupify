import React, { useEffect } from "react";
import {
    deleteContactGame,
    getContactGame,
} from "../../../../redux/actions/contact-game/ContactActions";

import Swal from "sweetalert2/src/sweetalert2";
import TableBackOffice from "../../../common-components/table-back-office";
import { connect } from "react-redux";
import { theadContestForm } from "../../../../data/admin/lists/tableHead";
import SearchBar from "../lists/search-bar";

const ListContestGame = (props) => {
    const { ContactGameList } = props.contactReducer;
    const { searching, searchDate, searchMonth, searchDateState, page } =
    props.searchingResult;
  
    useEffect(() => {
      props.getContactGame(  
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
          props.deleteContactGame(contact._id);
        }
      });
    };
  
    return (
      <>
      <SearchBar />
        {ContactGameList && (
          <TableBackOffice
            listData={ContactGameList}
            theadData={theadContestForm}
            tbody={ContactGameList.map((contact, index) => (
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
    getContactGame: (filter) => {
      dispatch(getContactGame(filter));
    },
    deleteContactGame: (id) => {
      dispatch(deleteContactGame(id));
    },
  });
  const mapStateToProps = (state) => {
    return {
      contactReducer: state.ContactGameReducer,
      searchingResult: state.SearchingReducer,
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListContestGame);


