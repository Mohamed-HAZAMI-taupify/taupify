import React, { useEffect } from "react";
import { Table, TabPane } from "reactstrap";
import RendezVousList from "./list";
import { connect } from "react-redux";
import Switch from "@material-ui/core/Switch";
import { purple } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { handleSwitch } from "../../../../../redux/actions/Searching";
import {
  getfilteredRdvs,
  getAllCanceledRdvs,
  getAllNotCanceledRdvs,
} from "../../../../../redux/actions/RdvActions";
import { ExportDataXLSXDouble } from "../../../../export-data-xlsx/Double";

function RendezVous(props) {
  const {
    searching,
    searchDate,
    searchMonth,
    searchDateState,
    switched,
    page,
  } = props.searchingResult;
  const { allCanceledRdvs, allNotCanceledRdvs } = props.rendezVousReducer;

  useEffect(() => {
    props.getfilteredRdvs();
    props.getAllCanceledRdvs();
    props.getAllNotCanceledRdvs();
  }, []);
  
  const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      "&$checked": {
        color: purple[500],
      },
      "&$checked + $track": {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div>
      <FormControlLabel
        className="table-head-option"
        control={
          <PurpleSwitch
            className="switch-btn"
            checked={switched}
            onChange={() => {
              let switching = !switched;
              props.handleSwitch(switching);
              props.getfilteredRdvs(
                {
                  searching,
                  searchDate,
                  searchMonth,
                  searchDateState,
                  switching,
                },
                false
              );
            }}
            name="checkedA"
          />
        }
        label="annulés"
      />

      <TabPane className="fixed_header-rdv" tabId="1">
        <Table striped>
          <thead>
            <tr style={{ fontFamily: "sans-serif" }}>
              <th className="num-column-rdv">№</th>
              <th className="name-column-rdv">Prénom et Nom</th>
              <th className="email-column-rdv">Email</th>
              <th className="tel-column-rdv">Téléphone</th>
              <th className="daterdv-column-rdv">Date RDV</th>
              <th className="heure-column-rdv">Heure</th>
              <th className="date-demande-column-rdv">Demandé le</th>
              <th className="annuler-column-rdv">Annulé</th>
              <th className="motif-column-rdv">Motif d'annulation</th>
              <th className="actions-column-rdv">Actions</th>
            </tr>
          </thead>

          <RendezVousList />
        </Table>
      </TabPane>

      <div className="export-button">
        <ExportDataXLSXDouble
          csvData={allNotCanceledRdvs}
          fileName={"RDVs"}
          option1={"RDVs"}
          csvData2={allCanceledRdvs}
          option2={"RDVs annullés"}
          fileName2={"RDVs annullés"}
        />
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getfilteredRdvs: (filter, skip) => {
    dispatch(getfilteredRdvs(filter, skip));
  },
  getAllCanceledRdvs: () => {
    dispatch(getAllCanceledRdvs());
  },
  getAllNotCanceledRdvs: () => {
    dispatch(getAllNotCanceledRdvs());
  },
  handleSwitch: (switched) => {
    dispatch(handleSwitch(switched));
  },
});
const mapStateToProps = (state) => {
  return {
    rendezVousReducer: state.RendezVousReducer,
    searchingResult: state.SearchingReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RendezVous);
