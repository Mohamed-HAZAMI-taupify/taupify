import Admin from "../../components/admin/index";
import {SuperAdminCRUD} from "../../components/superAdmin-login/Crud";
import TaupifyList from "../../components/admin/main-view/taupify/list";

import Liste from "../../components/admin/main-view/lists";
import EnvoyerEmail from "../../components/admin/main-view/send-email/index";
import EverfitList from "../../components/admin/main-view/everfit";
import Statistiques from "../../components/admin/main-view/statistiques";
import { data } from "./routesData";
import lemonOneContact from "../../components/admin/main-view/lists/lemon-one-contact";
import K2List from "../../components/admin/main-view/k2/index";
import FeedBackFormReport from "../../components/admin/main-view/feedback-form-report/index";
import ListContestGame from "../../components/admin/main-view/contest-form/index"
import ListFormEverest from "../../components/admin/main-view/formulaire-everest/index"
import ListFormEverfit from "../../components/admin/main-view/formulaire-everfit/index"
import ListOpenDayEverfit from "../../components/admin/main-view/formulaire-open-day/index"



export const routesSideBar = [
  { path: data.admin_path + data.superAdmin , component: SuperAdminCRUD },
  { path: data.admin_path, component: Admin },
  { path: data.admin_path + data.listes, component: Liste },
  {
    path: data.admin_path + data.listes + data.contact_everest,
    component: Liste,
  },
  { path: data.admin_path + data.listes + data.prospects, component: Liste },
  { path: data.admin_path + data.listes + data.archives, component: Liste },
  { path: data.admin_path + data.listes + data.membres, component: Liste },
  {
    path: data.admin_path + data.listes + data.prospect_catalogue,
    component: Liste,
  },
  { path: data.admin_path + data.listes + data.rendez_vous, component: Liste },
  { path: data.admin_path + data.listes + data.coaches, component: Liste },
  { path: data.admin_path + data.listes + data.studios, component: Liste },
  { path: data.admin_path + data.listes + data.activities, component: Liste },
  {
    path: data.admin_path + data.listes + data.extern_emails,
    component: Liste,
  },
  {
    path: data.admin_path + data.listes + data.nouveaux_messages,
    component: Liste,
  },
  { path: data.admin_path + data.lemon_one, component: lemonOneContact },
  { path: data.admin_path + data.escale_spa, component: Liste },
  { path: data.admin_path + data.listes + data.article, component: Liste },
  { path: data.admin_path + data.listes + data.popup, component: Liste },

  { path: data.admin_path + data.statistiques, component: Statistiques },
  {
    path: data.admin_path + data.statistiques + data.prospects,
    component: Statistiques,
  },
  {
    path: data.admin_path + data.statistiques + data.prospect_by_source,
    component: Statistiques,
  },
  {
    path: data.admin_path + data.statistiques + data.prospect_catalogue,
    component: Statistiques,
  },
  {
    path: data.admin_path + data.statistiques + data.pic_hours,
    component: Statistiques,
  },
  {
    path: data.admin_path + data.statistiques + data.contact_everest_by_date,
    component: Statistiques,
  },
  { path: data.admin_path + data.email, component: EnvoyerEmail },
  { path: data.admin_path + data.everfit, component: EverfitList },
  { path: data.admin_path + data.taupify, component: TaupifyList },
  { path: data.admin_path + data.k2, component: K2List },
  { path: data.admin_path + data.list_contest_game, component: ListContestGame },
  { path: data.admin_path + data.list_contact_formulaire_everest, component: ListFormEverest },
  { path: data.admin_path + data.list_contact_formulaire_everfit, component: ListFormEverfit },
  { path: data.admin_path + data.list_contact_open_day_everfit, component: ListOpenDayEverfit },
  { path: data.admin_path + data.feedback_form_report, component: FeedBackFormReport },

];
