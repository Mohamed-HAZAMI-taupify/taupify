import {
  SHOW_CANCELED_RDV,
  SHOW_ACTIVE_RDV,
  SHOW_ALL_RDV,
  GET_FILTERED_RDVS,
  GET_FILTERED_RDVS_SEARCH,
  GET_ALL_CANCELED_FILTERED_RDVS,
  GET_ALL_NOT_CANCELED_FILTERED_RDVS,
} from "../../data/actionTypes";
const initialState = {
  rendezVousList: [],
  rendezVousToggle: false,
  rendezVousDetails: {},
  rdvFilteredList: [],
  canceledFilteredList: [],
  activeFilteredList: [],
  rdvList: [],
  loading: true,
  allCanceledRdvs: [],
  allNotCanceledRdvs: [],
};
const RendezVousReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILTERED_RDVS:
      return {
        ...state,
        filteredRdvs: [...state.filteredRdvs, ...action.payload],
        hasMore: action.payload.length > 0,
        loading: false,
      };
    case GET_FILTERED_RDVS_SEARCH:
      return {
        ...state,
        ...action.payload,
        filteredRdvs: action.payload,
        hasMore: action.payload.length > 0,
        loading: false,
      };
    case SHOW_CANCELED_RDV:
      return {
        ...state,
        canceledFilteredList: action.payload,
      };
    case SHOW_ACTIVE_RDV:
      return {
        ...state,
        activeFilteredList: action.payload,
        loading: false,
      };
    case SHOW_ALL_RDV:
      return {
        ...state,
        rdvList: action.payload,
        loading: false,
      };
  
    case GET_ALL_CANCELED_FILTERED_RDVS:
      return {
        ...state,
        allCanceledRdvs: action.payload,
      };
    case GET_ALL_NOT_CANCELED_FILTERED_RDVS:
      return {
        ...state,
        allNotCanceledRdvs: action.payload,
      };
    default:
      return state;
  }
};
export default RendezVousReducer;
