import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actifPath } from "../../../../redux/actions/AdminActions";
import FadeIn from "react-fade-in";
import StatistiquesProspects from "./prospect";
import StatContactEverestByDate from "../../analyse-prospect/Stat-contact-everest-by-date";
import StatsProspectsBySource from "./prospect-by-source";

const Statistiques = (props) => {
  const { actifPath } = props.adminReducer;

  useEffect(() => {
    props.actifPath();
  }, []);

  const graphToRender = (actif_path) => {
    switch (actif_path) {
      case "prospects":
        return <StatistiquesProspects />;
      case "contact-everest-by-date":
        return <StatContactEverestByDate />;
      case "prospect-by-source":
        return <StatsProspectsBySource />;
    }
  };
  return <FadeIn>{graphToRender(actifPath)}</FadeIn>;
};

const mapDispatchToProps = (dispatch) => ({
  actifPath: () => {
    dispatch(actifPath());
  },
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistiques);
