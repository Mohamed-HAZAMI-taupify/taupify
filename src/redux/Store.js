import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import SearchingReducer from "./reducers/SearchingReducer";
import LoaderReducer from "./reducers/LoaderReducer";
import MembersReducer from "./reducers/ClientReducer";
import AdminReducer from "./reducers/AdminReducer";
import RendezVousReducer from "./reducers/RdvReducer";
import AuthReducer from "./reducers/AuthReducer";
import AlertReducer from "./reducers/AlertReducer";
import CoachListReducer from "./reducers/CoachReducer";
import StudioReducer from "./reducers/StudioReducer";
import ClubReducer from "./reducers/ClubReducer";
import EventReducer from "./reducers/EventReducer";
import ActivityReducer from "./reducers/ActivityReducer";
import SubscriptionReducer from "./reducers/SubscriptionReducer";
import MemberOwnEventsReducer from "./reducers/MemberOwnEventsReducer";
import EventCalendarReducer from "./reducers/EventCalendarReducer";
import EverfitContactReducer from "./reducers/everfit/ContactReducer";
import ContactUsProspectReducer from "./reducers/MesssageProspectReducer";
import LemonOneContactReducer from "./reducers/lemon-one/ContactReducer";
import ArticleReducer from "./reducers/ArticleReducer";
import PopUpNbreReducer from "./reducers/PopUpClickReducer";
import JournalReducer from "./reducers/JournalReducer";
import UploadPhotoReducer from "./reducers/UploadPhotoReducer";
import TaupifyContactReducer from "./reducers/taupify/ContactReducer";
import EscaleSpaContactReducer from "./reducers/escale-beaute-spa/ContactReducer";
import ContactEverestReducer from "./reducers/ContactEverestReducer";
import PopUpReducer from "./reducers/PopUpReducer";
import K2ContactReducer from "./reducers/k2/ContactReducer";
import QuestionReducer from "./reducers/customer-feedback/QuestionReducer";
import FeedbackFormReducer from "./reducers/customer-feedback/FeedbackFormReducer";
import AnswerReducer from "./reducers/customer-feedback/AnswerReducer";
import ContactGameReducer from "./reducers/contact-game/ContactReducer";
import ContactFormReducer from "./reducers/contact-formulaire/ContactReducer";
import ContactEverfitFormReducer from "./reducers/contact-formulaire-everfit/contactReducer";
import ContactOpenDayReducer from "./reducers/contact-open-day/contactReducer";
import AllAdminReducer from "./reducers/SuperAdminReducer";
import CoachesReducer from "./reducers/CoachesReducer"





import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import thunk from "redux-thunk";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});

const link = from([errorLink, new HttpLink()]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk.withExtraArgument(client))
);

const Store = createStore(
  combineReducers({
    SearchingReducer,
    LoaderReducer,
    MembersReducer,
    AdminReducer,
    RendezVousReducer,
    AlertReducer,
    CoachListReducer,
    StudioReducer,
    ClubReducer,
    EventReducer,
    AuthReducer,
    ActivityReducer,
    SubscriptionReducer,
    MemberOwnEventsReducer,
    EventCalendarReducer,
    EverfitContactReducer,
    ContactUsProspectReducer,
    LemonOneContactReducer,
    ArticleReducer,
    PopUpNbreReducer,
    JournalReducer,
    UploadPhotoReducer,
    TaupifyContactReducer,
    EscaleSpaContactReducer,
    ContactEverestReducer,
    PopUpReducer,
    K2ContactReducer,
    QuestionReducer,
    FeedbackFormReducer,
    AnswerReducer,
    ContactGameReducer,
    ContactFormReducer,
    ContactEverfitFormReducer,
    ContactOpenDayReducer,
    AllAdminReducer,
    CoachesReducer
  }),
  enhancer
);
export default Store;