import {
  ARTICLE_CONTENT,
  EDITOR_VALUE,
  GET_ARTCILE_JOURNAL_LIST,
  GET_ARTCILE_JOURNAL_BY_ID,
  ADD_ARTCILE_JOURNAL,
  ARTICLE_HEADER,
  ARTICLE_JOURNAL_DETAILS,
  ID_ARTICLE_TO_EDIT,
} from "../../data/actionTypes";

const initialState = {
  editorValue: "",
  articleHeader: {
    image: "https://i.ibb.co/h2SfSsq/shutterstock-1273597930-scaled.jpg",
  },
  articleContent: [
    {
      indexContent: 1,
      type: "",
      field: "",
    },
  ],
  articleJournalDetails: {},
  articleJournalList: [],
  articleJournalCreated: {},
  articleJournalById: {},
  idArticleToEdit:"",
  state: "",
  loading: true,
  loadingList: true,
  articleJournalTrend: [],
};

const JournalReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDITOR_VALUE:
      return {
        ...state,
        editorValue: action.payload,
      };
      case ID_ARTICLE_TO_EDIT:
        return {
          ...state,
          idArticleToEdit: action.payload,
        };
    case ARTICLE_CONTENT:
      return {
        ...state,
        articleContent: action.payload,
        
      };
    case ARTICLE_HEADER:
      return {
        ...state,
        articleHeader: action.payload,
      };
    case GET_ARTCILE_JOURNAL_LIST:
      return {
        ...state,
        articleJournalList: action.payload,
        loadingList:false,
      };
    case GET_ARTCILE_JOURNAL_BY_ID:
      return {
        ...state,
        articleJournalById: action.payload,
        loading: false,
      };
    case ADD_ARTCILE_JOURNAL:
      return {
        ...state,
        articleJournalCreated: action.payload,
      };
    case ARTICLE_JOURNAL_DETAILS:
      return {
        ...state,
        articleJournalDetails: action.payload,
      };
    default:
      return state;
  }
};
export default JournalReducer;
