import React from "react";
import { FaChartLine, FaHome, FaList, FaRegEnvelope } from "react-icons/fa";
import { data } from "./routes/routesData";
export const menuItems = [
  {
    name: "Dashboard",
    to: data.admin_path,
    icon: <FaHome />,
    subMenuItems: [],
  },

  {
    name: "Listes",
    to: data.admin_path + data.listes,
    redirection: data.admin_path + data.listes + data.contact_everest,
    icon: <FaList />,

    subMenuItems: [
      { name: "Contacts Everest ", to: data.contact_everest },
      { name: "Prospects", to: data.prospects },
      { name: "Archives", to: data.archives },
      { name: "Prospect-catalogue", to: data.prospect_catalogue },
      { name: "Emails externes", to: data.extern_emails },
      { name: "Nouveaux messages", to: data.nouveaux_messages },
      { name: "Rendez-vous", to: data.rendez_vous },
      { name: "Coaches", to: data.coaches },
      { name: "Studios", to: data.studios },
      { name: "Activités", to: data.activities },
      { name: "Articles", to: data.article },
      { name: "Pop Up", to: data.popup },
    ],
  },
  {
    name: "Statistiques",
    to: data.admin_path + data.statistiques,
    icon: <FaChartLine />,
    subMenuItems: [
      { name: "Prospect par type", to: data.prospects },
      { name: "Prospect par source", to: data.prospect_by_source },
      { name: "Contact Everest par date", to: data.contact_everest_by_date },
    ],
  },
  {
    name: "Envoyer Email",
    to: data.admin_path + data.email,
    icon: <FaRegEnvelope />,
    subMenuItems: [],
  },
  {
    name: "Formulaire de Satisfaction",
    to: data.admin_path + data.feedback_form_report,
    icon: (
      <img
        src="https://i.ibb.co/Sr1Mv5S/logo-everfit-1.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },
  {
    name: "Lemon one",
    to: data.admin_path + data.lemon_one,
    icon: (
      <img
        src="https://i.ibb.co/Sr1Mv5S/logo-everfit-1.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },
  {
    name: "L'escale Beauté & SPA",
    to: data.admin_path + data.escale_spa,
    icon: (
      <img
        src="https://i.ibb.co/Sr1Mv5S/logo-everfit-1.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },
  {
    name: "Everfit",
    to: data.admin_path + data.everfit,
    icon: (
      <img
        src="https://i.ibb.co/Sr1Mv5S/logo-everfit-1.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },
  {
    name: "Taupify",
    to: data.admin_path + data.taupify,
    icon: (
      <img
        src="https://i.ibb.co/6mq9RBF/logo-favicon.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },

  {
    name: "K2",
    to: data.admin_path + data.k2,
    icon: (
      <img
        src="https://i.ibb.co/6mq9RBF/logo-favicon.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },

  {
    name: "Jeux Concours",
    to: data.admin_path + data.list_contest_game,
    icon: (
      <img
        src="https://i.ibb.co/6mq9RBF/logo-favicon.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },

  {
    name: "Formulaire Everest",
    to: data.admin_path + data.list_contact_formulaire_everest,
    icon: (
      <img
        src="https://i.ibb.co/6mq9RBF/logo-favicon.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },

  {
    name: "Formulaire Everfit",
    to: data.admin_path + data.list_contact_formulaire_everfit,
    icon: (
      <img
        src="https://i.ibb.co/6mq9RBF/logo-favicon.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },

  {
    name: "Everfit Open Day",
    to: data.admin_path + data.list_contact_open_day_everfit,
    icon: (
      <img
        src="https://i.ibb.co/6mq9RBF/logo-favicon.png"
        className="sidebar-img-icons"
      ></img>
    ),
    subMenuItems: [],
  },
];
