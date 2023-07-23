import React from "react";
import { connect } from "react-redux";
import {
  searching,
  searchDate,
  searchMonth,
  searchDateState,
  handleScrollPage,
  searchingProspectType,
  searchingStateContact,
  searchingSourceContact,
} from "../../../../../redux/actions/Searching";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { getfilteredRdvs } from "../../../../../redux/actions/RdvActions";
import { getContactUsProspects } from "../../../../../redux/actions/MessageProspectAction";
import { makeStyles } from "@material-ui/core/styles";
import { getLemonOneContacts } from "../../../../../redux/actions/lemon-one/ContactActions";
import { getEscaleSpaContacts } from "../../../../../redux/actions/escale-beaute-spa/ContactActions";
import {
  months,
  propectTypeOptions,
  sourceList,
  stateList,
} from "../../../../../data/utils/searchListsData";
import { getPopUps } from "../../../../../redux/actions/PopUpAction";
import { getK2Contacts } from "../../../../../redux/actions/k2/ContactActions";
import { getContactForm } from "../../../../../redux/actions/contact-formulaire/ContactActions";
import { getContactFormEverfit } from "../../../../../redux/actions/contact-formulaire-everfit/ContactActions";
import { getContactOpenDay } from "../../../../../redux/actions/contact-open-day/contactActions";


const useStyles = makeStyles({
  ListboxComponent: {
    background: "white",
  },
});

const SearchBar = (props) => {
  const styles = useStyles();

  const { searching, searchDate, searchMonth, searchDateState, switched } =
    props.searchingResult;

  const path = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const getData = ({ searching, searchMonth, searchDate, searchDateState }) => {
    props.handleScrollPage(1);
    if (path === "rendez-vous") {
      props.getfilteredRdvs({
        switched,
        searching,
        searchDate,
        searchMonth,
        searchDateState,
      });
    }

    if (path === "nouveaux-messages") {
      props.getContactUsProspects(
        {
          searching,
          searchDate,
          searchMonth,
          searchDateState,
        },
        false
      );
    }
    if (path === "lemon-one") {
      props.getLemonOneContacts(
        {
          searching,
          searchDate,
          searchMonth,
          searchDateState,
        },
        
      );
    }
    if (path === "escale-spa") {
      props.getEscaleSpaContacts(
        {
          searching,
          searchDate,
          searchMonth,
          searchDateState,
        },
        false
      );
    }
    if (path === "popup") {
      props.getPopUps(
        {
          searching,
          searchDate,
          searchMonth, 
          searchDateState,
        }
      );
    }
    if (path === "k2") {
      props.getK2Contacts(
        {
          searching,
          searchDate,
          searchMonth, 
          searchDateState,
        }
      );
    }

    if (path === "list_contact_formulaire_everest") {
      props.getContactForm(
        {
          searching,
          searchDate,
          searchMonth, 
          searchDateState,
        }
      );
    }

    if (path === "list_contact_formulaire_everfit") {
      props.getContactFormEverfit(
        {
          searching,
          searchDate,
          searchMonth, 
          searchDateState,
        }
      );
    }

    if (path === "list_contact_open_day_everfit") {
      props.getContactOpenDay(
        {
          searching,
          searchDate,
          searchMonth, 
          searchDateState,
        }
      );
    }
  };

  return (
    <div className="searchDiv">
      <TextField
        id="outlined-search"
        label={searching ? searching : "Recherche ..."}
        type="search"
        variant="outlined"
        onChange={(event) => {
          const searching = event.target.value.trim();
          props.searching(searching);
          getData({
            searching,
            searchDate,
            searchMonth,
            searchDateState,
          });
        }}
        className={
          path === "extern-emails"
            ? "searchResult-extern-email"
            : "searchResult-textfield"
        }
      />

      {path !== "prospects" ? null : (
        <Autocomplete
          className="add-input half-input search-month-autocomplete search-prospectType-autocomplete"
          id="combo-box-demo"
          options={propectTypeOptions}
          getOptionLabel={(option) => option.toString()}
          onChange={(event, getOptionLabel) => {
            let searchprospectType = "";
            getOptionLabel
              ? props.searchingProspectType(getOptionLabel)
              : event
              ? props.searchingProspectType(event.target.value)
              : props.searchingProspectType("");

            getOptionLabel
              ? (searchprospectType = getOptionLabel)
              : event
              ? (searchprospectType = event.target.value)
              : (searchprospectType = "");
            getData({
              searching,
              searchDate,
              searchMonth,
              searchDateState,
              searchprospectType,
            });
          }}
          renderInput={(params) => (
            <TextField
              className="add-input specific-input"
              {...params}
              label={
                props.searchingResult.searchprospectType
                  ? props.searchingResult.searchprospectType
                  : "Choisir un source de prospect ..."
              }
              variant="outlined"
              fullWidth
              onChange={(event) => {
                let searchprospectType = "";

                event
                  ? props.searchingProspectType(event.target.value)
                  : props.searchingProspectType("");
                event
                  ? (searchprospectType = event.target.value)
                  : (searchprospectType = "");
                getData({
                  searching,
                  searchDate,
                  searchMonth,
                  searchDateState,
                  searchprospectType,
                });
              }}
              value={props.searchingResult.searchprospectType}
            />
          )}
        />
      )}

      {path !== "contact-everest" ? null : (
        <Autocomplete
          className="add-input half-input search-month-autocomplete search-prospectType-autocomplete"
          id="combo-box-demo"
          options={stateList}
          getOptionLabel={(option) => option.toString()}
          onChange={(event, getOptionLabel) => {
            let searchState = "";
            getOptionLabel
              ? props.searchingStateContact(getOptionLabel)
              : event
              ? props.searchingStateContact(event.target.value)
              : props.searchingStateContact("");

            getOptionLabel
              ? (searchState = getOptionLabel)
              : event
              ? (searchState = event.target.value)
              : (searchState = "");
          }}
          renderInput={(params) => (
            <TextField
              className="add-input specific-input"
              {...params}
              label={"Choisir un status de contact ..."}
              variant="outlined"
              fullWidth
              value={props.searchingResult.searchState}
            />
          )}
        />
      )}

      {path !== "contact-everest" ? null : (
        <Autocomplete
          className="add-input half-input search-month-autocomplete search-prospectType-autocomplete"
          id="combo-box-demo"
          options={sourceList}
          getOptionLabel={(option) => option.toString()}
          onChange={(event, getOptionLabel) => {
            let searchSource = "";
            getOptionLabel
              ? props.searchingSourceContact(getOptionLabel)
              : event
              ? props.searchingSourceContact(event.target.value)
              : props.searchingSourceContact("");

            getOptionLabel
              ? (searchSource = getOptionLabel)
              : event
              ? (searchSource = event.target.value)
              : (searchSource = "");
          }}
          renderInput={(params) => (
            <TextField
              className="add-input specific-input"
              {...params}
              label={"Choisir un source de contact ..."}
              variant="outlined"
              fullWidth
              value={props.searchingResult.searchSource}
            />
          )}
        />
      )}

      {path === "extern-emails" ? null : (
        <Autocomplete
          className="add-input half-input search-month-autocomplete"
          id="combo-box-demo"
          options={months}
          classes={{
            listbox: styles.ListboxComponent,
          }}
          getOptionLabel={(option) => option.toString()}
          onChange={(event, getOptionLabel) => {
            let searchMonth = "";
            getOptionLabel
              ? props.searchMonth(getOptionLabel)
              : event
              ? props.searchMonth(event.target.value)
              : props.searchMonth("");

            getOptionLabel
              ? (searchMonth = getOptionLabel)
              : event
              ? (searchMonth = event.target.value)
              : (searchMonth = "");
            getData({
              searching,
              searchDate,
              searchMonth,
              searchDateState,
            });
          }}
          renderInput={(params) => (
            <TextField
              className="add-input specific-input"
              {...params}
              label={
                props.searchingResult.searchMonth
                  ? props.searchingResult.searchMonth
                  : "Choisir un mois ..."
              }
              variant="outlined"
              fullWidth
              onChange={(event) => {
                let searchMonth = "";

                event
                  ? props.searchMonth(event.target.value)
                  : props.searchMonth("");
                event ? (searchMonth = event.target.value) : (searchMonth = "");
                getData({
                  searching,
                  searchDate,
                  searchMonth,
                  searchDateState,
                });
              }}
              value={props.searchingResult.searchMonth}
            />
          )}
        />
      )}
      {path === "extern-emails" ? null : (
        <div className="search-date">
          {!props.searchingResult.searchDateState ? (
            <EventBusyIcon
              className="date-icon busy-icon"
              onClick={() => {
                let searchDateState = true;
                props.searchDateState(true);
                getData({
                  searching,
                  searchDate,
                  searchMonth,
                  searchDateState,
                });
              }}
            />
          ) : (
            <EventAvailableIcon
              className="date-icon available-icon info"
              onClick={() => {
                let searchDateState = false;
                props.searchDateState(false);
                getData({
                  searching,
                  searchDate,
                  searchMonth,
                  searchDateState,
                });
              }}
            />
          )}

          <DatePicker
            className="date-picker"
            selected={searchDate}
            onChange={(date) => {
              let searchDate = date;
              props.searchDate(date);
              getData({
                searching,
                searchDate,
                searchMonth,
                searchDateState,
              });
            }}
          />
        </div>
      )}
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  searching: (event) => {
    dispatch(searching(event));
  },
  searchDate: (date) => {
    dispatch(searchDate(date));
  },
  searchMonth: (type) => {
    dispatch(searchMonth(type));
  },
  searchDateState: (etat) => {
    dispatch(searchDateState(etat));
  },
  getEscaleSpaContacts: (filter) => {
    dispatch(getEscaleSpaContacts(filter));
  },
  handleScrollPage: (page) => {
    dispatch(handleScrollPage(page));
  },
  getfilteredRdvs: (filter, skip) => {
    dispatch(getfilteredRdvs(filter, skip));
  },
  getContactUsProspects: (filter, skip) => {
    dispatch(getContactUsProspects(filter, skip));
  },
  getLemonOneContacts: (filter, skip) => {
    dispatch(getLemonOneContacts(filter, skip));
  },
  searchingProspectType: (filter) => {
    dispatch(searchingProspectType(filter));
  },
  searchingStateContact: (filter) => {
    dispatch(searchingStateContact(filter));
  },
  searchingSourceContact: (filter) => {
    dispatch(searchingSourceContact(filter));
  },
  getPopUps: (filter) => {
    dispatch(getPopUps(filter));
  },
  getK2Contacts: (filter) => {
    dispatch(getK2Contacts(filter))
  },
  getContactForm: (filter) => {
    dispatch(getContactForm(filter))
  },
  getContactFormEverfit: (filter) => {
    dispatch(getContactFormEverfit(filter))
  },
  getContactOpenDay: (filter) => {
    dispatch(getContactOpenDay(filter))
  },


});
const mapStateToProps = (state) => {
  return {
    searchingResult: state.SearchingReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);