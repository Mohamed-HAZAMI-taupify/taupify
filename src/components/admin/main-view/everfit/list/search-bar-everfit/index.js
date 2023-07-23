import React from "react";
import { connect } from "react-redux";
import {
  searching,
  searchDate,
  searchMonth,
  searchDateState,
  handleScrollPage,
} from "../../../../../../redux/actions/Searching";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { getEverfitContacts } from "../../../../../../redux/actions/everfit/ContactActions";

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const SearchBarEverfit = (props) => {
  const { searching, searchDate, searchMonth, searchDateState } =
    props.searchingResult;
  const getData = ({ searching, searchDate, searchMonth, searchDateState }) => {
    props.handleScrollPage(1);
    let page = 1;
    props.getEverfitContacts({
      searching,
      searchDate,
      searchMonth,
      searchDateState,
    });
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
          props.searching(event.target.value);
          getData({
            searching,
            searchDate,
            searchMonth,
            searchDateState,
          });
        }}
        className="search-input-text "
      />

      <Autocomplete
        className="add-input half-input"
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.toString()}
        style={{ width: 300, marginBottom: "5px" }}
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
  getEverfitContacts: (filter) => {
    dispatch(getEverfitContacts(filter));
  },
  handleScrollPage: (page) => {
    dispatch(handleScrollPage(page));
  },
});
const mapStateToProps = (state) => {
  return {
    searchingResult: state.SearchingReducer,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBarEverfit);
