import React, { useEffect } from "react";
import SearchBar from "./search-bar";
import { actifPath } from "../../../../redux/actions/AdminActions";
import RendezVous from "./rdv";
import { connect } from "react-redux";
import NewCoach from "./coach/index";
import Studio from "./studio/index";
import Activity from "./activity/index";
import NouveauMessages from "./message";
import LemonOneContact from "./lemon-one-contact";
import AddAdminComponentButton from "../../../common-components/add-admin-component-button";
import AddStudioModal from "./add/studio";
import AddProspectModal from "./add/prospect";
import AddMemberModal from "./add/client";
import AddCoachModal from "./add/coach";
import AddPopUpModal from "./add/popup";
import { Row, Col } from "react-bootstrap";
import AddExternEmailsModal from "./add/extern-email";
import FadeIn from "react-fade-in";
import AddActivityModal from "./add/activity/";
import Articles from "./article";
import { createArticleJournal } from "../../../../redux/actions/ArticleJournalActions";
import jwt_decode from "jwt-decode";
import EscaleSpaContact from "./escale-spa";
import AdminList from "../../../common-components/admin-list";
import ContactEverest from "./contact-everest";
import PopUp from "./popup/";

const Liste = (props) => {
  const { actifPath } = props.adminReducer;
  const { searchState, searchSource } = props.searchingResult;

  useEffect(() => {
    props.actifPath();
  }, []);

  const handleAddArticleClick = async (e) => {
    e.preventDefault();
    await props.createArticleJournal({
      cover: "https://i.ibb.co/h2SfSsq/shutterstock-1273597930-scaled.jpg",
      type: "",
      title: "",
      createdAt: new Date(),
      createdBy: jwt_decode(localStorage.getItem("tokenEverest")).user.name,
      content: [
        {
          indexContent: 1,
          type: "",
          field: "",
        },
      ],
      state: "ARCHIVED",
      isTrend: false,
      visitor_count: 0,
    });
  };

  const NameToRender = (actif_path) => {
    switch (actif_path) {
      case "":
        return <h3 className="table-name">LISTES</h3>;
      case "prospects":
        return <h3 className="table-name">Prospects</h3>;
      case "contact-everest":
        return <h3 className="table-name">Contact Everest</h3>;
      case "nouveaux-messages":
        return <h3 className="table-name">Message Everest</h3>;
      case "archives":
        return <h3 className="table-name">Archives</h3>;
      case "prospect-test":
        return <h3 className="table-name">prospectsTest</h3>;
      case "prospect-catalogue":
        return <h3 className="table-name">prospects catalogues</h3>;
      case "rendez-vous":
        return <h3 className="table-name">Rendez-vous</h3>;
      case "coaches":
        return <h3 className="table-name">Coachs</h3>;
      case "studios":
        return <h3 className="table-name">Studios</h3>;
      case "activities":
        return <h3 className="table-name">Activités</h3>;
      case "contact-us-prospects":
        return <h3 className="table-name">Nouveaux messages</h3>;
      case "extern-emails":
        return <h3 className="table-name">emails externs</h3>;
      case "Lemon-one":
        return <h3 className="table-name">Lemon One</h3>;
      case "article":
        return <h3 className="table-name">Articles</h3>;
      case "Pop Up":
        return <h3 className="table-name">Pop Up</h3>;
    }
  };
  const tableToRender = (actif_path) => {
    switch (actif_path) {
      case "prospects":
        return <ContactEverest state={"prospect"} />;
      case "contact-everest":
        return <ContactEverest state={searchState} sourceId={searchSource} />;
      case "archives":
        return <ContactEverest state={"lost_client"} />;
      case "prospect-test":
        return <ContactEverest state={"fake_client"} />;
      case "prospect-catalogue":
        return <ContactEverest state={"exten_emails"} sourceId={"catalog"} />;
      case "rendez-vous":
        return <RendezVous />;
      case "coaches":
        return <NewCoach />;
      case "studios":
        return <Studio />;
      case "activities":
        return <Activity />;
      case "extern-emails":
        return <ContactEverest state={"exten_emails"} />;
      case "nouveaux-messages":
        return <NouveauMessages />;
      case "lemon-one":
        return <LemonOneContact />;
      case "escale-spa":
        return <EscaleSpaContact />;
      case "article":
        return <Articles />;
      case "popup":
        return <PopUp />;
      case "listes":
        return <AdminList />;
    }
  };

  const addBtnToRender = (actif_path) => {
    switch (actif_path) {
      case "prospects":
        return (
          <>
            <AddAdminComponentButton toggleName="prospect" />
            <AddProspectModal />
          </>
        );
      case "membres":
        return (
          <div>
            <AddAdminComponentButton toggleName="member" />
            <AddMemberModal />
          </div>
        );
      case "coaches":
        return (
          <>
            <AddAdminComponentButton toggleName="coach" />
            <AddCoachModal />
          </>
        );
      case "studios":
        return (
          <>
            <AddAdminComponentButton toggleName="studio" />
            <AddStudioModal />
          </>
        );
      case "activities":
        return (
          <>
            <AddAdminComponentButton toggleName="activity" />
            <AddActivityModal />
          </>
        );
      case "extern-emails":
        return (
          <>
            <AddAdminComponentButton toggleName="externEmail" />
            <AddExternEmailsModal />
          </>
        );
      case "escale-spa":
        return (
          <>
            <AddAdminComponentButton toggleName="escaleSpa" />
            <AddExternEmailsModal />
          </>
        );
      case "article":
        return (
          <div id="" className="btn-div-add-admin">
            <button
              className="icon-btn add-btn"
              onClick={handleAddArticleClick}
            >
              <div className="add-icon"></div>
              <div className="btn-txt">Ajouter Article</div>
            </button>
          </div>
        );
      case "popup":
        return (
          <>
            <AddAdminComponentButton toggleName="addPopup" />
            <AddPopUpModal />
          </>
        );
    }
  };
  return (
    <FadeIn>
      <div className="table-container card card-body">
        <Row>
          <Col sm={9}>
            <div>{NameToRender(actifPath)}</div>
          </Col>
          <Col sm={3}>
            <div className="add-btn-div-tab">{addBtnToRender(actifPath)}</div>
          </Col>
        </Row>
        <SearchBar />
        {tableToRender(actifPath)}
      </div>
    </FadeIn>
  );
};
const mapDispatchToProps = (dispatch) => ({
  actifPath: () => {
    dispatch(actifPath());
  },
  createArticleJournal: (article) => {
    dispatch(createArticleJournal(article));
  },
});
const mapStateToProps = (state) => {
  return {
    adminReducer: state.AdminReducer,
    journalReducer: state.JournalReducer,
    searchingResult: state.SearchingReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Liste);
