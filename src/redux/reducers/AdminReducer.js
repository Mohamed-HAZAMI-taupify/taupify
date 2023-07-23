import { TOGGLE, PATH_TOGGLE } from "../../data/actionTypes";

const initialState = {
  actifPath: "listes",
  etat: false,
  modal: {
    addPopup: false,
    updatePopup: false,
    aspectPopup: false,
    homePopup: true,
    prospectTest: false,
    popupDetails: false,
    InfoRdvCoachPopUp: false,
    prospect: false,
    member: false,
    coach: false,
    homePageModal: true,
    coachDetailsModal: false,
    activity: false,
    studio: false,
    calendarEvents: false,
    forgetPassword: false,
    updateMemberModal: false,
    updateStudioModal: false,
    updateActivityModal: false,
    updateProspectModal: false,
    updateContactEverestModal: false,
    updateCoachModal: false,
    prospectDetailsModal: false,
    contactEverestDetailsModal: false,
    confirmRdv: false,
    activityDetailsModal: false,
    modalUpdateStudio: false,
    modalUpdateActivity: false,
    catalog: true,
    studioDetailsModal: false,
    memberDetailsModal: false,
    archiveDetailsModal: false,
    sendEmailConfirmationModal: false,
    externEmail: false,
    editExternEmail: false,
    navbarState: false,
    everfitContact: false,
    everfitContactDetails: false,
    taupifyContactDetails: false,
    everfitContactEdit: false,
    videoModal: false,
    entryPopUp: true,
    inscriptionhomePageModal: true,
    connexionModal: false,
    maquetteInputModal: false,
    maquetteDetailsModal: false,
    contactUsDetailsModal: false,
    replyContactUsModal: false,
  },
};
const AdminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PATH_TOGGLE:
      return {
        ...state,
        actifPath: window.location.href.substring(
          window.location.href.lastIndexOf("/") + 1
        ),
      };

    case TOGGLE:
      return { ...state, modal: { ...state.modal, [payload]: action.etat } };

    default:
      return state;
  }
};
export default AdminReducer;
